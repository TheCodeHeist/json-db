import JSON_DB from "./../src/index";
import fs from "fs";
import path from "path";

const dbFilePath = path.join(__dirname, "db.json");

const db = new JSON_DB(dbFilePath);

db.on("push", (db, id, data) => {
  console.log(`New data pushed to db!`);
  console.log(db);
});
