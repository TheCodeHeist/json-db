/// <reference types="node" />
import EventEmitter from "events";
declare class JSON_DB extends EventEmitter {
    dbFilePath: string;
    snapshot: JSON;
    constructor(dbFilePath: string);
    loadDB(): JSON;
    post(id: string, data: any): void;
    delete(id: string): void;
    put(id: string, data: any): void;
    get(id: string): any;
}
export default JSON_DB;
