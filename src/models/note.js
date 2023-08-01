export class Note {
    /**
     * @param { string } name 
     * @param { number } creaded 
     * @param { string } category 
     * @param { string } content 
     */
    constructor(name, creaded, category, content) {
        this.name = name;
        this.creaded = creaded;
        this.category = category;
        this.content = content;
    }
    get dates() {
        return Array.from(this.content.matchAll(/\d{2}\/\d{2}\/\d{4}/g));
    }
}