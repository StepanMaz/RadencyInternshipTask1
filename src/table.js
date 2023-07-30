import { tagsService } from "./services/tagsService.js";
import { formatDate } from "./utils.js";

const main_table_body = document.querySelector("#main-table tbody");

/** @param {Note[]} data */
export function renderMainTable(data) {

    main_table_body.innerHTML = '';

    for (const note of data) {
        main_table_body.appendChild(noteToHTML(note));
    }

    /** @param {Note} note */
    function noteToHTML(note) {
        const table_row = document.createElement("tr");
        const table_datas = Array(7).fill().map(_ => document.createElement("td"));

        table_datas[0].append(getIcon(note));
        table_datas[1].innerText = note.name;
        table_datas[2].innerText = formatDate(note.creaded);
        table_datas[3].innerText = note.category;
        table_datas[4].innerText = note.content;
        table_datas[5].innerText = note.dates.map(formatDate).join(', ');

        addControlNoteButtons(table_datas[6], data, note);

        table_datas.forEach(td => table_row.appendChild(td));

        return table_row;

        /** @param {HTMLElement} element @param {Note[]} source @param {Note} note */
        function addControlNoteButtons(element, source, note) {
            const buttons = Array(3).fill().map(_ => document.createElement("button"));

            buttons[0].innerHTML = `<i class="fa fa-edit"></i>`;
            buttons[0].onclick += editNoteClick(note);

            buttons[1].innerHTML = `<i class="fa fa-archive"></i>`;
            buttons[1].onclick += archiveNoteClick(source, note);

            buttons[2].innerHTML = `<i class="fa fa-trash"></i>`;
            buttons[2].onclick += deleteNoteClick(source, note);

            buttons.forEach(button => element.appendChild(button));
        }
    }

    /** @param {Note} note @returns {HTMLElement} */
    function getIcon(note) {
        const image = document.createElement("img");
        image.src = tagsService.getUrl(note.category);
        image.alt = "None";
        return image;
    }
}

/** @param {Note} note */
export function editNoteClick(note) {

}

/** @param {Note[]} source @param {Note} note */
export function deleteNoteClick(source, note) {

}

/** @param {Note[]} source @param {Note} note */
export function archiveNoteClick(source, note) {

}