import { toObservable } from "./observableObject";

const localStorageKeyName = "saved_notes";

export class InternalStorage
{
    #active_notes;
    #archived_notes;
    
    /**
     * @param {{active_notes: any, archived_notes: any}} data 
     */
    constructor(data) {
        data ??= {};
        this.active_notes = new NoteCollection(data.active_notes);
        this.archived_notes =  new NoteCollection(data.archived_notes);
    }

    /**
     * @returns {NoteCollection}
     */
    get active() {
        return this.#active_notes;
    }

    /**
     * @returns {NoteCollection}
     */
    get archived() {
        return this.#archived_notes;
    }

    /**
     * Creates instance of `InternalStorage` form data saved on `localStorage`
     * @returns {InternalStorage}
     */
    static fromLocalStorage() {
        return new InternalStorage(JSON.parse(localStorage.getItem(localStorageKeyName) ?? ""));
    }

    /**
     * Saves all data to local storage
     */
    saveToLocalStorage() {
        localStorage.setItem(localStorageKeyName, JSON.stringify(this))
    }
}

class NoteCollection extends EventTarget {
    #data;

    /**
     * Creates instance from provided data. Data is cloned.
     * @param {any[]} data 
     */
    constructor(data) {
        this.#data = data.map(toObservable) ?? [];
    }

    /**
     * Adds item to collection and notifies subscribers.
     * @param {any} item 
     */
    add(item) {
        this.#data.push(toObservable(item));
        this.dispatchEvent(new Event("changed"));
    }

    /**
     * Removes item from collection and notifies subscribers.
     * @param {any} item 
     */
    remove(index) {
        delete this.#data.splice(index, 1);
        this.dispatchEvent(new Event("changed"));
    }

    /**
     * Applies new rules for serealization of this class
     * @returns {string}
     */
    toJSON() {
        return JSON.stringify(this.#data)
    }

    /**
     * @returns {any[]}
     */
    getAll(){
        return [...this.#data];
    }
}