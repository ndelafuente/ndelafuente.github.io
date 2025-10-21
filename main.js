const API_URL = atob('aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J4VE1XOTFueFJNV2U3b081bXIwaGdpdV9RaEtmZ0hMVzJjT2FubzlHMTdLYVU5QkdBcHZIdjZjQkxJRE1Wc2FxeHlYQS9leGVj');

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
        claimed[entry.Recipe] = entry.Chef;

        const div = document.createElement("div");
        div.className = "entry";
        div.textContent = `${entry.Recipe} ↭ ${entry.Chef.toLowerCase()}`;
        if (entry['Sous-chef']) div.textContent += ' + ' + entry['Sous-chef'].toLowerCase();
        if (entry['Notes']) div.textContent += ` (${entry.Notes})`;
        list.appendChild(div);
    });
    console.log("Claimed", claimed);
}

const initialRefreshPromise = refreshList();

document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    await initialRefreshPromise; // ensure claimed recipes are populated
    const recipe = document.getElementById("recipe").value.trim().toUpperCase();
    if (!(recipe in recipes)) { alert("Invalid recipe"); return }
    if (recipe in claimed && !confirm(`Recipe already claimed by ${claimed[recipe]}. Proceed?`)) { return }
    showLoading();
    const category = document.getElementById("category").value;
    const chef = document.getElementById("chef").value;
    const sous_chef = document.getElementById("sous-chef").value;
    const notes = document.getElementById("notes").value;
    const submitData = btoa(JSON.stringify({ recipe, category, chef, sous_chef, notes }));
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

const categories = {
    Nashta: "Nashta: Breakfast and Snacks",
    Chakna: "Chakna: Small Sharing Plates",
    Rassa: "Rassa: Curries",
    DalSabzi: "Dal & Sabzi: Side Dishes",
    RotiChawal: "Roti & Chawal: Rice and Breads",
    AcharChutney: "Achar & Chutney: Pickles and Dips",
    Meetha: "Meetha: Desserts",
}
const recipes = {
    "AKURI MASALA": categories.Nashta,
    "ALOO PARATHA": categories.Nashta,
    "CHOLE BHATURE": categories.Nashta,
    "PESARATTU": categories.Nashta,
    "IDLI SAMBHAR": categories.Nashta,
    "MISAL PAO": categories.Nashta,
    "PUNJABI SAMOSA": categories.Nashta,
    "VERMICELLI UPMA": categories.Nashta,
    "CHILLA": categories.Nashta,
    "SABUDANA KHICHDI": categories.Nashta,
    "BREAD PAKORA": categories.Nashta,
    "POHA MASALA": categories.Nashta,
    "POORI BHAJI": categories.Nashta,
    "BEDAI BHAJI": categories.Nashta,
    "ALOO PYAZ MIRCH BHAJIA": categories.Chakna,
    "TAREKO ALOO (CRISPY FRIED POTATOES)": categories.Chakna,
    "VANGI BHAAT": categories.Chakna,
    "CHICKPEA AND SAMPHIRE SALAD": categories.Chakna,
    "CHANDNI CHOWK KI ALOO TIKKI": categories.Chakna,
    "STUFFED SWEET PEPPERS": categories.Chakna,
    "TAWA SALAD": categories.Chakna,
    "LOTUS ROOT CHILLI FRY": categories.Chakna,
    "BEETROOT CUTLETS": categories.Chakna,
    "APPLE AND ROOTS DHOKLA SALAD": categories.Chakna,
    "SUN-DRIED TOMATO AND ASPARAGUS ROLLS": categories.Chakna,
    "KIDNEY BEAN KEBAB": categories.Chakna,
    "MALABAR CAULIFLOWER": categories.Chakna,
    "DAL CHAWAL AUR ACHAR": categories.Chakna,
    "BHARWAN GUCHHI (STUFFED MORELS)": categories.Chakna,
    "TOFU AND GREEN PEA TIKKI": categories.Chakna,
    "SEASONAL GREENS COUSCOUS SALAD": categories.Chakna,
    "JACKFRUIT MASALA": categories.Rassa,
    "GUNCHO KEEMA": categories.Rassa,
    "LOTUS ROOT KOFTA": categories.Rassa,
    "COURGETTE MUSSALAM": categories.Rassa,
    "KADAI TOFU": categories.Rassa,
    "KADHI PAKORA": categories.Rassa,
    "MUSHROOM AND TRUFFLE KHICHADI": categories.Rassa,
    "BAINGAN KA BHARTA": categories.Rassa,
    "DUM ALOO": categories.Rassa,
    "PANEER ANARDANA": categories.Rassa,
    "BHARLELI VANGI": categories.Rassa,
    "BOTTLEGOURD KOFTA": categories.Rassa,
    "KHUBANI SOYA KEEMA": categories.Rassa,
    "PANEER MAKHANI": categories.Rassa,
    "BAINGAN MIRCH KA SALAN": categories.Rassa,
    "CARROT KOSHAMBIR": categories.DalSabzi,
    "JEERA ALOO": categories.DalSabzi,
    "JAIPURI BHINDI": categories.DalSabzi,
    "KWATI": categories.DalSabzi,
    "BRUSSELS SPROUT PORIYAL": categories.DalSabzi,
    "ALOO GOBI": categories.DalSabzi,
    "DAL MAKHANI": categories.DalSabzi,
    "PALAK PANEER": categories.DalSabzi,
    "PUNJABI RAJMA RASILA": categories.DalSabzi,
    "PANEER BHURJI": categories.DalSabzi,
    "TADKA DAL": categories.DalSabzi,
    "PALUNGO KO SAAG": categories.DalSabzi,
    "PINDI CHANA": categories.DalSabzi,
    "BHUTEKO BHAT (NEPALESE FRIED RICE)": categories.RotiChawal,
    "JACKFRUIT BIRYANI": categories.RotiChawal,
    "MISSI ROTI": categories.RotiChawal,
    "MAKKI KI ROTI": categories.RotiChawal,
    "CHAPATI": categories.RotiChawal,
    "ZARDA (SWEET PULAO)": categories.RotiChawal,
    "BUTTER NAAN": categories.RotiChawal,
    "VEG TEHRI (SEASONAL GREENS WITH RICE)": categories.RotiChawal,
    "CHICKPEA AND MUSHROOM BIRYANI": categories.RotiChawal,
    "CHUR CHUR PARATHA": categories.RotiChawal,
    "COCONUT CHUTNEY": categories.AcharChutney,
    "CAULIFLOWER PICKLE": categories.AcharChutney,
    "RAW MANGO CHUTNEY (AAM KI LAUNJI)": categories.AcharChutney,
    "GREEN MINT CHUTNEY": categories.AcharChutney,
    "TOMATO CHUTNEY": categories.AcharChutney,
    "MIXED WILD BERRY CHUTNEY": categories.AcharChutney,
    "CORIANDER AND MINT CHUTNEY": categories.AcharChutney,
    "TAMARIND CHUTNEY": categories.AcharChutney,
    "MOOLI PICKLE": categories.AcharChutney,
    "AVOCADO CHUTNEY": categories.AcharChutney,
    "POACHED PEARS": categories.Meetha,
    "AAMRAS POORI": categories.Meetha,
    "ROSE AND CASHEW BARFI": categories.Meetha,
    "MALPUA": categories.Meetha,
    "RABRI KULFI": categories.Meetha,
    "ANJEER KHEER": categories.Meetha,
    "CARROT HALWA": categories.Meetha,
    "PHIRNI": categories.Meetha,
}

function loadRecipes() {
    const dl = document.getElementById("recipes");
    const recipeNames = Object.keys(recipes).sort()
    for (const recipe of recipeNames) {
        const opt = document.createElement("option");
        opt.value = recipe;
        dl.appendChild(opt);
    };
}

loadRecipes();


const recipeElement = document.getElementById("recipe");
recipeElement.addEventListener("input", (event) => {
    const recipe = event.target.value.trim().toUpperCase();
    if (!recipe || recipe in recipes) event.target.style.background = "";

    const category = (recipe in recipes) ? recipes[recipe] : "";
    document.getElementById("category").value = category;
});
recipeElement.addEventListener("blur", (event) => {
    const recipe = event.target.value.trim().toUpperCase();
    event.target.style.background = (!recipe || recipe in recipes) ? "" : "pink";
});