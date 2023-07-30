export const CHANGE_EVENT_NAME = "change";
/**
 * Wraps an object in another such that each change in the object causes an event
 * @template T
 * @param {T} object 
 * @returns {T & EventTarget}
 */
export function toObservable(object) {
    /**
     * @type {T & EventTarget}
     */
    const note = {};
    Object.setPrototypeOf(note, EventTarget);
    for (const key in object) {
        const objAttributes = {configurable: false, get: () => object[key] }

        if(Object.getOwnPropertyDescriptor(key).writable) {
            objAttributes.set = (value) => {
                object[key] = value;
                note.dispatchEvent(new Event(CHANGE_EVENT_NAME));
            };
        }

        Object.defineProperty(note, key, objAttributes)
    }
    Object.freeze(object);
    Object.freeze(note);
    return note;
}