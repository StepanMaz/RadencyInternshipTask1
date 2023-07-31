import { openDialog } from "./dialog.js";
import { renderStatisticsTable } from "./statistics.js";
import { formatDate, getIcon } from "./utils.js";

const main_table_body = document.querySelector("#main-table tbody");

/** @param {Note[]} data */
export function renderMainTable(data) {
    console.log("rendering with", data)
    main_table_body.innerHTML = '';

    for (const note of data) {
        main_table_body.appendChild(noteToHTML(note));
    }

    renderStatisticsTable();

    /** @param {Note} note */
    function noteToHTML(note) {
        const table_row = document.createElement("tr");
        const table_datas = Array(7).fill().map(_ => document.createElement("td"));

        table_datas[0].append(getIcon(note.category));
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
            buttons[0].onclick = () => editNoteClick(source, note);

            buttons[1].innerHTML = `<i class="fa fa-archive"></i>`;
            buttons[1].onclick = () => archiveNoteClick(source, note);

            buttons[2].innerHTML = `<i class="fa fa-trash"></i>`;
            buttons[2].onclick = () => deleteNoteClick(source, note);

            buttons.forEach(button => element.appendChild(button));
        }
    }

   
}

/** @param {Note} note */
export function editNoteClick(source, note) {
    openDialog(newnote => {
        for (const key in newnote) {
            if(key in note)
                note[key] = newnote[key];
        }
        
        renderMainTable(source)
    }, note)

}

/** @param {Note[]} source @param {Note} note */
export function deleteNoteClick(source, note) {
    removeFromArray(source, note);

    renderMainTable(source)
}

/** @param {Note[]} source @param {Note} note */
export function archiveNoteClick(source, note) {
    removeFromArray(source, note);

    source.alternative?.push(note);

    renderMainTable(source)
}

function removeFromArray(array, item) {
    const index = array.indexOf(item);
    
    for (let i = index; i < array.length; i++) {
        array[i] = array[i + 1];
    }

    array.pop();
}