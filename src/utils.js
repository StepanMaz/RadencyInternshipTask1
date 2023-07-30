/** @param {number} utc_time @returns {string} */
export function formatDate(utc_time) {
    const date = new Date(utc_time);
    return `${date.getUTCFullYear()}/${date.getUTCMonth()}/${date.getUTCMonth()}`;
}