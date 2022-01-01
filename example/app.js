import JSON_DB from "./../src/index";
import path from "path";

const dbFilePath = path.join(__dirname, "./databases/users.json");

const db = new JSON_DB(dbFilePath);

db.on("add", (snapshot, id, data) => {
  console.log(`New data added to db!`);
});

db.on("delete", (snapshot, id, deletedData) => {
  console.log(`Data deleted from db!`);
});

db.on("update", (snapshot, id, updatedData) => {
  console.log(`Data updated in db!`);
});

db.post("10110", {
  name: "James Bond",
  email: "jamesbond20238@gmail.com",
  age: 14,
  favColors: ["Red", "Blue"],
});

db.post("10101", {
  name: "Jim Davis",
  email: "jim.davis.49@gmail.com",
  age: 22,
  favColors: ["Blue"],
});

db.delete("10110");

db.put("10110", {
  email: "jamesbond20239@gmail.com",
});

const value = db.get("10101");
console.log(value);
value.favColors.push("Green");
console.log(value);
