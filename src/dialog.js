import { Note } from "./models/note.js";
import { tagsService } from "./services/tagsService.js";
import { formatDate } from "./utils.js";

/** @type {HTMLDialogElement} */
const dialog = document.getElementById("note-dialog");

const close_dialog_button = document.getElementById("close-dialog-button");

/** @type {HTMLInputElement} */
const note_name = document.getElementById("input-note-name");
/** @type {HTMLSelectElement} */
const note_category = document.getElementById("input-note-category");
/** @type {HTMLInputElement} */
const note_content = document.getElementById("input-note-content");

const submit_button = document.getElementById("submit-button");

close_dialog_button.onclick = () => close();

function close() {
    dialog.close();

    clearDialog();

    function clearDialog() {
        note_name.value = '';
        note_category.value = '';
        note_content.value = '';

        console.log(note_name);
    }
}

export function openDialog(onsubmit, data) {
    updateTags();
    dialog.showModal();

    if (data) {
        loadData(data);
    }

    submit_button.onclick = () => {
        try {
            const data = collect()

            onsubmit(data);
            close();
        } catch (e) {
            alert(e);
        }
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
        note_name.value = data.name;
        note_category.value = data.category;
        note_content.value = data.content;
    }

    /** @returns Note */
    function collect() {
        if (!note_name.value.match(/\w+/)) throw new Error("Incorrect name format")
        if (!note_content.value.match(/\w+/)) throw new Error("Incorrect content format")

        return new Note(
            note_name.value,
            Date.now(),
            note_category.value,
            note_content.value
        );
    }
}

