import { getIcon, groupBy } from "./utils.js";

const statistics_table_body = document.querySelector("#staticstics-table tbody");

let active, archive;

export function initStatistics(active_notes, archive_notes) {
    active = active_notes;
    archive = archive_notes;
}

export function renderStatisticsTable() {
    const active_tags = groupBy(active, "category");
    const archive_tags = groupBy(archive, "category");

    const tagsmap = new Map();

    for (const tag in active_tags) {
        if(!tagsmap.has(tag)) {
            tagsmap.set(tag, {active: 0, archive: 0});
        }
        tagsmap.get(tag).active = active_tags[tag].length;
    }

    for (const tag in archive_tags) {
        if(!tagsmap.has(tag)) {
            tagsmap.set(tag, {active: 0, archive: 0});
        }
        tagsmap.get(tag).archive = archive_tags[tag].length;
    }

    console.log(tagsmap)


    statistics_table_body.innerHTML = '';
    for (const item of tagsmap.entries()) {
        const row = document.createElement("tr");
        const table_datas = Array(4).fill().map(_ => document.createElement("td"));
        
        let icon;
        try{
            icon = getIcon(item[0])
        } catch {
            icon = "None"
        }

        table_datas[0].append(icon); 
        table_datas[1].innerText = item[0];
        table_datas[2].innerText = item[1].active;
        table_datas[3].innerText = item[1].archive;

        table_datas.forEach(td => row.appendChild(td));

        statistics_table_body.appendChild(row);
    }
}