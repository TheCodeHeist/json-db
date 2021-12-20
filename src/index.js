import fs from "fs";
import path from "path";
import EventEmitter from "events";

export default class JSON_DB {
  constructor(dbFilePath) {
    this.status = new EventEmitter();
    this.dbFilePath = dbFilePath;
    this.db = {};
    this.loadDB();
  }

  loadDB() {
    if (fs.existsSync(this.dbFilePath)) {
      this.db = JSON.parse(fs.readFileSync(this.dbFilePath));
    } else {
      throw new Error(`JSON file not found: ${this.dbFilePath}`);
    }

    return this;
  }

  push(id, data) {
    this.db[id] = data;

    fs.writeFileSync(this.dbFilePath, JSON.stringify(this.db));

    this.status.emit("push", this.db, id, data);
  }
}
