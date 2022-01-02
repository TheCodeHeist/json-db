import fs from "fs";
// import path from "path";
import EventEmitter from "events";

class JSON_DB extends EventEmitter {
  constructor(dbFilePath) {
    super();

    this.dbFilePath = dbFilePath;
    this.snapshot = this.loadDB();
  }

  loadDB() {
    let dbData;

    if (fs.existsSync(this.dbFilePath)) {
      // Check if the file is completely empty
      if (fs.readFileSync(this.dbFilePath).toString() === "") {
        fs.writeFileSync(this.dbFilePath, "{}");
      }

      dbData = JSON.parse(fs.readFileSync(this.dbFilePath));

      // console.log(dbData)
    } else {
      throw new Error(`JSON file not found: ${this.dbFilePath}`);
    }

    return dbData;
  }

  post(id, data) {
    // Check if id exists
    if (this.snapshot[id]) {
      throw new Error(
        `ID already exists: ${id}\nTry using put() method to update that ID with data instead.`
      );
    } else {
      this.snapshot[id] = data;

      fs.writeFileSync(this.dbFilePath, JSON.stringify(this.snapshot));

      this.emit("add", this.snapshot, id, data);
    }
  }

  delete(id) {
    // Check if id exists
    if (this.snapshot[id]) {
      const prevData = this.snapshot;
      const dataDeleted = this.snapshot[id];
      delete this.snapshot[id];

      fs.writeFileSync(this.dbFilePath, JSON.stringify(this.snapshot));

      this.emit("delete", this.snapshot, prevData, id, dataDeleted);
    } else {
      throw new Error(`ID not found: ${id}\nMake sure that ID exists.`);
    }
  }

  put(id, data) {
    // Check if id exists
    if (this.snapshot[id]) {
      const prevData = this.snapshot;
      this.snapshot[id] = { ...this.snapshot[id], ...data };

      fs.writeFileSync(this.dbFilePath, JSON.stringify(this.snapshot));

      this.emit("update", this.snapshot, prevData, id, data);
    } else {
      throw new Error(
        `ID not found: ${id}\nTry using post() method to add that ID with data instead.`
      );
    }
  }

  get(id) {
    // Check if id exists
    if (this.snapshot[id]) {
      return this.snapshot[id];
    } else {
      throw new Error(
        `ID not found: ${id}\nMake sure you know what you are looking for.`
      );
    }
  }
}

export default JSON_DB;
