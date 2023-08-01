import { Note } from "./models/note.js";
import { renderMainTable } from "./table.js";
import { openDialog } from "./dialog.js";
import { initStatistics } from "./statistics.js";

/** @type Note[] & { alternative: Note[] } */
export const active_notes = [
    new Note("somename", Date.now(), "task", "shopping"),
    new Note("somename", Date.now(), "task", "shopping"),
    new Note("somename", Date.now(), "task", "shopping"),
];
/** @type Note[] & { alternative: Note[] } */
export const archived_notes = [];

active_notes.alternative = archived_notes;
archived_notes.alternative = active_notes;

/** @type Note[] & { alternative: Note[] } */
let current = active_notes;

initStatistics(active_notes, archived_notes);

document.getElementById("open-archive-button").addEventListener("click",
    () => {
        current = current.alternative;
        renderMainTable(current);
    });

document.getElementById("archive-all-button").addEventListener("click",
    () => {
        for (const note of current) {
            current.alternative.push(note);
        }
        current.length = 0;

        current = current.alternative;
        renderMainTable(current);
    });

document.getElementById("delete-all-button").addEventListener("click",
    () => {
        current.length = 0;
        renderMainTable(current);
    });

document.getElementById("create-note-button").addEventListener("click",
    () => openDialog((newnote) => {
        active_notes.push(newnote);
        current = active_notes;
        renderMainTable(active_notes);
    }));

renderMainTable(current);