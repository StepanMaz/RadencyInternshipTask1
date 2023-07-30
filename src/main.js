import { tagsService } from "./services/tagsService.js";
import { Note } from "./models/note.js";
import { renderMainTable } from "./table.js";
import { openDialog } from "./dialog.js";

/** @type Note[] */
const active_notes = [
    new Note("somename", Date.now(), "task", "shopping", [Date.now(), Date.now()]),
    new Note("somename", Date.now(), "task", "shopping", [Date.now(), Date.now()]),
    new Note("somename", Date.now(), "task", "shopping", [Date.now(), Date.now()]),
];
/** @type Note[] */
const archived_notes = [];

const notes_swap = createSwaper(active_notes, archived_notes);

document.getElementById("open-archive-button").onclick = 
    function openArchive() {
        renderMainTable(notes_swap()[0]);
    }

document.getElementById("create-note-button").onclick = 
    function createNote() {
        console.log(1);
        openDialog();
    }

renderMainTable(notes_swap.first);

function createSwaper(first, second) {
    const swap = function() {
        return [swap.first, swap.second] = [swap.second, swap.first];
    }
    swap.first = first;
    swap.second = second;
    return swap;
}