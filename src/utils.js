import { tagsService } from "./services/tagsService.js";

/** @param {number} utc_time @returns {string} */
export function formatDate(utc_time) {
    const date = new Date(utc_time);
    return date.toISOString().substring(0, 10);
}

export function groupBy(xs, key) {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

/** @param {Note} note @returns {HTMLElement} */
export function getIcon(tag) {
    const image = document.createElement("img");
    const url = tagsService.getUrl(tag)
    if(!url) throw new Error("tag is not supported");
    image.src = url;
    return image;
}