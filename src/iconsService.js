import iconsConf from "../iconsConf.json" assert { type: "json" };

export const iconsService = {
    /**
     * 
     * @param {string} icon_identifier 
     * @returns {string?}
     */
    get(icon_identifier) {
        return iconsConf[icon_identifier];
    },
    
    /**
     * Returns all registered icon identifires and their urls
     * @returns {{icon_identifier: string, url: string}}
     */
    getAll() {
        return Object.keys(iconsConf).map(icon_identifier => ({
                icon_identifier,
                url: this.get(icon_identifier)
            })
        );
    }
}