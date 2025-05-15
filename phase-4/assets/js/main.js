const checkboxCats = document.getElementById("cats");
const checkboxDogs = document.getElementById("dogs");
const input = document.getElementById("userInput");
const button = document.getElementById("getResponseButton");
const responseContainer = document.getElementById("apiResponseContainer");
const apiKey = "wHvsrUUvx1UMoeadJ17Aaw==RJ7UiFsmZQ74kaju";
const baseURL = "https://api.api-ninjas.com/v1/";


// Event handler function for check event in checkbox
function uncheckOtherAndClearContent(checked, other) {
    other.checked = false;
    input.value = "";
    responseContainer.textContent = "";
}

// add event handler to the checkbox
checkboxCats.addEventListener("change", event => {
    if (checkboxCats.checked) {
        uncheckOtherAndClearContent(checkboxCats, checkboxDogs);
    }
});

checkboxDogs.addEventListener("change", event => {
    if (checkboxDogs.checked) {
        uncheckOtherAndClearContent(checkboxDogs, checkboxCats);
    }
});

function fetchFromNinjaAPI(endpoint, energyLevel) {
    const parameter = endpoint === "cats"? "playfulness" : "energy";
    const apiURL = `${baseURL}${endpoint}?${parameter}=${energyLevel}`;
    fetch(apiURL,{
        headers: {
            "x-api-key": apiKey,
            "content-type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch response from API");
            }
            return response.json();
        })
        .then(data=> {
            const key = "name";
            let output = "";
            for (let i = 0; i < data.length; i++) {
                const text = data[i][key];
                output += `${text};`;
            }
            responseContainer.textContent = output;
        })
        .catch(error => {
            responseContainer.textContent = `${error.message}`;
        });
}

button.addEventListener("click", (event) => {
    const energyLevel = parseInt(input.value);
    // Handle User Input errors
    if (!energyLevel || energyLevel <1 || energyLevel >5) {
        responseContainer.textContent = "Error: Please enter a number between 1 and 5";
        return;
    }
    if (checkboxCats.checked) {
        fetchFromNinjaAPI("cats", energyLevel);
    }
    else if (checkboxDogs.checked) {
        fetchFromNinjaAPI("dogs", energyLevel);
    }
    // Handle User Input Checkbox error
    else{
        responseContainer.textContent = "Please select either cats or dogs!";
    }
});