const { API_URL, EVENT_DATE, VALIDATE_RECIPES, RECIPES } = CONFIG;
const recipes = RECIPES;

if (!API_URL || !EVENT_DATE) {
    console.warn(CONFIG, "missing value(s)");
}

if (new Date() > EVENT_DATE) {
    hide('signupForm');
    show('eventPassed');
}


const claimed = {};
async function refreshList() {
    const list = document.getElementById("list");
    show('recipeLoading');
    const res = await fetch(API_URL + '?mode=entries');
    const data = await res.json();
    console.log("SheetData", data);
    hide('recipeLoading');
    list.innerHTML = "";
    data?.forEach(entry => {
        claimed[entry.Recipe.toUpperCase()] = entry.Chef;

        const div = document.createElement("div");
        div.className = "entry";
        div.textContent = `${entry.Recipe}`;
        if (entry['Translation']) div.textContent += ' - ' + entry['Translation'];
        div.textContent += ` ↭ ${entry.Chef.toLowerCase()}`;
        if (entry['Sous-chef']) div.textContent += ' + ' + entry['Sous-chef'].toLowerCase();
        if (entry['Notes']) div.textContent += ` (${entry.Notes})`;
        if (entry['Cuisine']) div.textContent = `${entry.Cuisine}: ${div.textContent}`;
        list.appendChild(div);
    });
    console.log("Claimed", claimed);
}

const initialRefreshPromise = refreshList();

document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    await initialRefreshPromise; // ensure claimed recipes are populated
    const recipe = document.getElementById("recipe").value.trim().toUpperCase();
    if (VALIDATE_RECIPES && !(recipe in recipes)) { alert("Invalid recipe"); return }
    if (recipe in claimed && !confirm(`Recipe already claimed by ${claimed[recipe]}. Proceed?`)) { return }
    showLoading();
    const translation = document.getElementById("translation")?.value;
    const cuisine = document.getElementById("cuisine")?.value;
    const category = document.getElementById("category").value;
    const chef = document.getElementById("chef").value;
    const sous_chef = document.getElementById("sous-chef").value;
    const notes = document.getElementById("notes").value;
    const submitData = JSON.stringify({ recipe, translation, category, cuisine, chef, sous_chef, notes, ...recipes[recipe] });
    console.log({ submitData });
    try {
        const res = await fetch(`${API_URL}?mode=submit&data=${encodeURIComponent(submitData)}`);
        const refreshPromise = refreshList();

        const data = await res.json();
        console.log("Response:", data);

        if (data.status === "OK") {
            e.target.reset(); // reset form contents
            await refreshPromise;
            submitSucceed();
        }
        else {
            alert("Error submitting recipe: " + (data.error || "Unknown error"));
        }

    } catch (err) {
        console.error(err);
        alert("Failed to submit recipe.\n" + err.message);
    }
});


function hide(...ids) { ids.forEach(id => document.getElementById(id).classList.add('hidden')) }
function show(...ids) { ids.forEach(id => document.getElementById(id).classList.remove('hidden')) }

function showLoading() {
    show('loading');
}

function submitSucceed() {
    hide('signupForm', 'loading',);
    show('claimAgain');
}

document.getElementById('claimAgain').addEventListener('click', () => {
    show('signupForm');
    hide('claimAgain');
});

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
            opt.value = recipes[recipe].recipe;
            if ('translation' in recipes[recipe]) {
                opt.text = recipes[recipe].translation?.normalize('NFKD');
            }
            dl.appendChild(opt);
        };
    }

    loadRecipes();
    const recipeElement = document.getElementById("recipe");
    recipeElement.addEventListener("input", (event) => {
        const recipe = event.target.value.trim().toUpperCase();
        if (!recipe || recipe in recipes) event.target.style.background = "";

        document.getElementById("category").value = recipes[recipe]?.category ?? "";
        document.getElementById("translation").value = recipes[recipe]?.translation ?? "";
    });
    recipeElement.addEventListener("blur", (event) => {
        const recipe = event.target.value.trim().toUpperCase();
        event.target.style.background = (!recipe || recipe in recipes) ? "" : "pink";
    });
}
