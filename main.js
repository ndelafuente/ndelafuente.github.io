const { API_URL, EVENT_DATE, VALIDATE_RECIPES, RECIPES, DISCOURAGE_MSG } = CONFIG;
const recipes = RECIPES;

if (!API_URL || !EVENT_DATE) {
    console.warn(CONFIG, "missing value(s)");
}

const eventIsActive = () => new Date() <= EVENT_DATE || isExpoMode();
const isExpoMode = () => new URL(location.href).searchParams.get('mode') === 'expo'


/***
 * Indexed DB functions
 */
const DB_NAME = 'deletion_tokens';
const DB_VERSION = 1;

function deleteDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase(DB_NAME);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

function initalizeDB(event) {
    console.log('initializing DB')
    const db = event.target.result;

    db.createObjectStore('tokens', { keyPath: 'id' });
}

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = initalizeDB;
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function saveDeletionToken(id, token) {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction('tokens', 'readwrite');

        tx.objectStore('tokens').put({ id, token });

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

async function getDeletionToken(id) {
    if (!eventIsActive()) { return '' }
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction('tokens', 'readonly');

        const request = tx.objectStore('tokens').get(id);

        request.onsuccess = () => resolve(request.result?.token);
        request.onerror = () => reject(request.error);
    });
}

async function removeDeletionToken(id) {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction('tokens', 'readwrite');

        const request = tx.objectStore('tokens').delete(id)

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function hasDeletionTokens() {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction('tokens', 'readonly');

        const request = tx.objectStore('tokens').count()
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => { console.error(request.error); resolve(false) }
    });
}

/***
 * Backend operations
 */
async function doGet(mode, params = {}) {
    const endpoint = new URL(API_URL);
    endpoint.search = new URLSearchParams({
        mode: mode,
        data: encodeURIComponent(JSON.stringify(params)),
    });
    const res = await fetch(endpoint.href);
    return res.json();
}

const claimed = {};
async function refreshList() {
    const list = document.getElementById("recipeList");
    show('recipeLoading');
    hide('recipeList');

    const data = await doGet("entries");
    console.log("SheetData", data);
    hide('recipeLoading');
    show('recipeList');
    list.innerHTML = "";
    for (const entry of data) {
        const id = entry.ID;
        const recipe = entry.Recipe;
        claimed[recipe.toUpperCase()] = entry.Chef;
        const div = document.createElement("div");
        div.className = "entry";

        const span = document.createElement("span");
        let text = `${entry.Chef.toLowerCase()}`;
        if (entry['Sous-chef']) text += ' + ' + entry['Sous-chef'].toLowerCase();
        text += ` ↭ ${recipe}`;
        // if (entry['Translation']) text += ' ' + entry['Translation'];
        if (entry['Notes']) text += ` (${entry.Notes})`;
        if (entry['Cuisine']) text = ` ${entry.Cuisine}: ${text}`;
        span.textContent = text;
        div.appendChild(span);

        const deleteToken = id && await getDeletionToken(id);
        if (deleteToken) {
            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-entry";
            deleteButton.textContent = 'x';
            deleteButton.type = "button";
            deleteButton.onclick = () => onDelete(id, recipe);
            div.appendChild(deleteButton);
        }
        list.appendChild(div);
    }
    console.log("Claimed", claimed);
}

const initialRefreshPromise = refreshList();


document.getElementById("signupForm").addEventListener("submit", onSubmit);

async function onSubmit(e) {
    e.preventDefault();
    await initialRefreshPromise; // ensure claimed recipes are populated
    const recipe = document.getElementById("recipe").value.trim().toUpperCase();
    if (VALIDATE_RECIPES && !(recipe in recipes) && !confirm(`Recipe not in list '${recipe}'. Proceed?`)) { return }
    if (recipe in claimed && !confirm(`Recipe already claimed by ${claimed[recipe]}. Proceed?`)) { return }
    if (recipes?.[recipe]?.discouraged && !confirm(DISCOURAGE_MSG)) { return }
    showLoading();
    const translation = document.getElementById("translation")?.value;
    const cuisine = document.getElementById("cuisine")?.value;
    const category = document.getElementById("category").value || "Other";
    const chef = document.getElementById("chef").value.trim();
    const sous_chef = document.getElementById("sous-chef").value.trim();
    const notes = document.getElementById("notes").value.trim();
    const additional = (typeof recipes?.[recipe] === "string") ? {} : (recipes?.[recipe] || {});
    const submitData = { recipe, translation, category, cuisine, chef, sous_chef, notes, ...additional };
    console.log({ submitData });
    try {
        const data = await doGet("submit", submitData);

        console.log("Response:", data);

        if (data.status !== "OK") { throw new Error(data.error || "Unknown error") }

        const { id, token } = data;
        console.assert(id && token, "Missing id or token");

        await saveDeletionToken(id, token);
        await refreshList();

        e.target.reset(); // reset form contents
        submitSucceed();

    } catch (err) {
        console.error(err);
        alert([
            'Failed to submit recipe. Please notify Nico.',
            `Error '${err.message}'`,
            `With data: ${JSON.stringify(submitData, null, 4)}`
        ].join('\n'));
        hideLoading();
    }
}


async function onDelete(id, recipe) {
    if (!confirm(`Unclaim recipe '${recipe}'?`)) { return }
    console.log('delete', id, recipe);

    const token = await getDeletionToken(id);

    try {
        showLoading();
        const data = await doGet('delete', { id, token });
        await removeDeletionToken(id);

        console.log("Response:", data);

        if (data.status !== "OK") { throw new Error(data.error || "Unknown error") }

        await refreshList();
        alert(`Successfully unclaimed '${recipe}'`);
        await init();
        hideLoading();
    } catch (err) {
        console.error(err);
        alert("Failed to delete recipe.\n" + err.message);
    }
}

/***
 * Visibility control
 */
async function init() {
    if (!eventIsActive()) {
        hide('signupForm');
        show('eventPassed');
        await deleteDB();
    }
    else if (await hasDeletionTokens()) { submitSucceed() } // already claimed
    else { showClaim() }
}

function hide(...ids) { ids.forEach(id => document.getElementById(id).classList.add('hidden')) }
function show(...ids) { ids.forEach(id => document.getElementById(id).classList.remove('hidden')) }

function showLoading() {
    show('loading');
    window.scrollTo(0, 0);
}

function hideLoading() { hide('loading') }

function submitSucceed() {
    hide('signupForm', 'loading',);
    show('claimAgain');
}

function showClaim() {
    show('signupForm');
    hide('claimAgain');
}

document.getElementById('claimAgain').addEventListener('click', showClaim);
init();

/***
 * Recipe validation
 */
if (VALIDATE_RECIPES) {
    if (!recipes) {
        console.error("Validating recipes, but recipes not defined.")
    }

    function loadRecipes() {
        const dl = document.getElementById("recipes");
        const normalize = s => s.replace(/^[^a-z]+/gi, '').toUpperCase();
        const recipeNames = Object.keys(recipes).sort((a, b) => normalize(a).localeCompare(normalize(b)));
        for (const recipe of recipeNames) {
            const opt = document.createElement("option");
            opt.value = recipes[recipe].recipe || recipe;
            if (recipes[recipe].translation) {
                opt.textContent = recipes[recipe].translation?.normalize('NFKD').replace(/([a-z])[^ a-z]+/ig, '$1');
            } else if (recipes[recipe].alt) {
                opt.textContent = recipes[recipe].alt;
            }

            dl.appendChild(opt);
        };
    }

    loadRecipes();
    const recipeElement = document.getElementById("recipe");
    recipeElement.addEventListener("input", (event) => {
        const recipe = event.target.value.trim().toUpperCase();
        if (!recipe || recipe in recipes) event.target.style.background = "";

        document.getElementById("category").value = recipes[recipe]?.category || recipes[recipe] || "";
        const translationElement = document.getElementById("translation")
        if (translationElement) {
            translationElement.value = recipes[recipe]?.translation ?? "";
        }
    });
    recipeElement.addEventListener("blur", (event) => {
        const recipe = event.target.value.trim().toUpperCase();
        event.target.style.background = (!recipe || recipe in recipes) ? "" : "rgb(255, 254, 167)";
    });
}
