"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const events_1 = __importDefault(require("events"));
class JSON_DB extends events_1.default {
    constructor(dbFilePath) {
        super();
        this.dbFilePath = dbFilePath;
        this.snapshot = this.loadDB();
    }
    loadDB() {
        let dbData;
        if (fs_1.default.existsSync(this.dbFilePath)) {
            if (fs_1.default.readFileSync(this.dbFilePath, "utf-8") === "") {
                fs_1.default.writeFileSync(this.dbFilePath, "{}");
            }
            dbData = JSON.parse(fs_1.default.readFileSync(this.dbFilePath, "utf8"));
        }
        else {
            throw new Error(`JSON file not found: ${this.dbFilePath}`);
        }
        return dbData;
    }
    post(id, data) {
        if (this.snapshot[id]) {
            throw new Error(`ID already exists: ${id}\nTry using put() method to update that ID with data instead.`);
        }
        else {
            this.snapshot[id] = data;
            fs_1.default.writeFileSync(this.dbFilePath, JSON.stringify(this.snapshot));
            this.emit("add", this.snapshot, id, data);
        }
    }
    delete(id) {
        if (this.snapshot[id]) {
            const prevData = this.snapshot;
            const dataDeleted = this.snapshot[id];
            delete this.snapshot[id];
            fs_1.default.writeFileSync(this.dbFilePath, JSON.stringify(this.snapshot));
            this.emit("delete", this.snapshot, prevData, id, dataDeleted);
        }
        else {
            throw new Error(`ID not found: ${id}\nMake sure that ID exists.`);
        }
    }
    put(id, data) {
        if (this.snapshot[id]) {
            const prevData = this.snapshot;
            this.snapshot[id] = Object.assign(Object.assign({}, this.snapshot[id]), data);
            fs_1.default.writeFileSync(this.dbFilePath, JSON.stringify(this.snapshot));
            this.emit("update", this.snapshot, prevData, id, data);
        }
        else {
            throw new Error(`ID not found: ${id}\nTry using post() method to add that ID with data instead.`);
        }
    }
    get(id) {
        if (this.snapshot[id]) {
            return this.snapshot[id];
        }
        else {
            throw new Error(`ID not found: ${id}\nMake sure you know what you are looking for.`);
        }
    }
}
exports.default = JSON_DB;
//# sourceMappingURL=index.js.map