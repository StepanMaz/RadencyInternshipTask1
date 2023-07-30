export class Note {
    /**
     * @param { string } name 
     * @param { number } creaded 
     * @param { string } category 
     * @param { string } content 
     * @param { number[] } dates 
     */
    constructor(name, creaded, category, content, dates) {
        this.name = name;
        this.creaded = creaded;
        this.category = category;
        this.content = content;
        this.dates = dates;
    }
}