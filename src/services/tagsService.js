import tagsConf from "../../tagsConf.json" assert { type: "json" };

const tagsMap = new Map(tagsConf.map(item => [item.tag, item]));

export const tagsService = {
    /**
     * @returns { IterableIterator<string> }
     */
    getAllTags() {
        return tagsMap.keys();
    },

    /**
     * @param {string} tag 
     * @returns {string}
     */
    getUrl(tag) {
        return tagsMap.get(tag.toLowerCase()).icon_url;
    }
}