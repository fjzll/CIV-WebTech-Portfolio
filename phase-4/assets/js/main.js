const checkboxQuotes = document.getElementById("quotes");
const checkboxJokes = document.getElementById("jokes");
const input = document.getElementById("userInput");
const button = document.getElementById("getResponseButton");
const responseContainer = document.getElementById("apiResponseContainer");

// checkbox functionality
// one checkbox is clicked, the other is unchecked

function uncheckOtherAndClearContent(checked, other) {
    other.checked = false;
    input.value = "";
    responseContainer.textContent = "";
}


checkboxJokes.addEventListener("change", event => {
    if (checkboxJokes.checked) {
        uncheckOtherAndClearContent(checkboxJokes, checkboxQuotes);
    }
});

checkboxQuotes.addEventListener("change", event => {
    if (checkboxQuotes.checked) {
        uncheckOtherAndClearContent(checkboxQuotes, checkboxJokes);
    }
});

button.addEventListener("click", (event) => {
    input.value = "";
});