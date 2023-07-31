import { Note } from "./models/note.js";
import { tagsService } from "./services/tagsService.js";
import { formatDate } from "./utils.js";

/** @type {HTMLDialogElement} */
const dialog = document.getElementById("note-dialog");

const close_dialog_button = document.getElementById("close-dialog-button");

const note_name = document.getElementById("input-note-name");
/** @type {HTMLSelectElement} */
const note_category = document.getElementById("input-note-category");
const note_content = document.getElementById("input-note-content");

const dates_container = document.getElementById("dates-container");

const add_dates_button = document.getElementById("add-date-button");

const submit_button = document.getElementById("submit-button");

/** @type {HTMLInputElement[]} */
let date_inputs = [];

add_dates_button.onclick = () => addDate();
close_dialog_button.onclick = () => close();

/** @param {number} date */
function addDate(date) {
    const date_input = document.createElement("input");
    date_input.type = "date";

    if(date)
        date_input.value = new Date(date).toISOString().substring(0,10);

    date_inputs.push(date_input);

    dates_container.appendChild(date_input);
}

function close() {
    dialog.close();

    clearDialog();

    function clearDialog() {
        dates_container.innerHTML = '';
        note_name.innerHTML = '';
        note_category.innerHTML = '';
        note_content.innerHTML = '';
        dates_container.innerText = '';
        note_name.innerText = '';
        note_category.innerText = '';
        note_content.innerText = '';
    
        date_inputs = [];
    }
}

export function openDialog(onsubmit, data) {
    updateTags();
    dialog.showModal();

    if(data) {
        loadData(data);
    }

    submit_button.onclick = () => {
        onsubmit(collect());
        close();
    }

    function updateTags() {
        note_category.innerHTML = '';
        for (const tag of tagsService.getAllTags()) {
            const option = document.createElement("option");
            option.value = tag;
            option.innerText = tag.charAt(0).toUpperCase() + tag.slice(1);
    
            note_category.appendChild(option);
        }
    }

    /** @param {Note} data */
    function loadData(data) {
        console.log(data);
        note_name.value = data.name;
        note_category.value = data.category;
        note_content.value = data.content;
        for (const date of data.dates) {
            addDate(formatDate(date));
        }
    }

    /** @returns Note */
    function collect() {
        return new Note(
            note_name.value,
            Date.now(),
            note_category.value,
            note_content.value,
            date_inputs.filter(input => input.valueAsDate).map(input => input.valueAsDate.getTime())
        );
    }
}

