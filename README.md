# **node-nosql-db**

<!-- [![NPM](https://nodei.co/npm/node-nosql-db.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/node-nosql-db) -->

<a href="https://www.npmjs.com/package/node-nosql-db" style="width: 100%; display: flex; align-items: center; justify-content: center">
  <img src="https://nodei.co/npm/node-nosql-db.png?downloads=true&downloadRank=true&stars=true" alt="NPM" />
</a>

<div style="width: 100%; height: 4rem; display: flex; align-items: center; justify-content: center">
  <a href="https://www.npmjs.com/package/node-nosql-db" style="margin: 0 .5rem">
    <img src="https://img.shields.io/npm/v/node-nosql-db/latest?color=%23dd0000&label=node-nosql-db%40latest" style="width: 15.5rem" alt="npm (tag)" />
  </a>
  <a href="https://github.com/TheCodeHeist/json-db" style="margin: 0 .5rem">
    <img src="https://img.shields.io/github/license/TheCodeHeist/json-db" style="width: 7rem" alt="GitHub" />
  </a>
</div>

Handler for local JSON (NoSQL) Databases with data sending, receiving, updating, deleting, and even with extra ".on" events!

---

## 📥 **Installation**

Make sure you have the latest version of [Node.js](https://nodejs.org/en/download/) and then install the package either with [NPM](https://www.npmjs.com/) or with [YarnPKG](https://yarnpkg.com/).

```bash
$ npm i node-nosql-db@latest
```

```bash
$ yarn add node-nosql-db@latest
```

---

## 🔧 **Functions and Events**

Let's get to know the functions and events in this module.

_Functions:_

- [.loadDB()](#load_db) - Loads and returns the database from the file as usable JSON.
- [.post(id, data)](#post_met) - Adds a new entry to the database.
- [.get(id)](#get_met) - Returns the data with the given ID.
- [.put(id, data)](#put_met) - Updates the data with the given ID.
- [.delete(id)](#delete_met) - Deletes the data with the given ID.

_Events:_

- [.on("add")](#events) - Emitted when a new entry is added to the database.
- [.on("delete")](#events) - Emitted when an entry is deleted from the database.
- [.on("update")](#events) - Emitted when an entry is updated in the database.

---

## 📚 **Documentations**

Here's the documentation for the functions and events in this module.

<h3 id="load_db"><b>📂 Load Database Data</b></h3>

The `.loadDB()` function loads the database data and returns it as a JSON object. So, it is possible to store the data in a variable as a snapshot of the database, and then revert the data back into the database if any wrong changes are made.

```js
// File: app.js
// The main JavaScript file.

const JSON_DB = require("node-nosql-db"); // Import the module.
const userDB = new JSON_DB("./database/users.json"); // Create a new instance of the JSON_DB class.

let data = userDB.loadDB(); // Load the database data in a variable.
console.log(data); // Print the data.
```

```json
// File: /database/users.json
// The JSON file, which will be manipulated as a database.

{
  "1": {
    "name": "John Doe",
    "email": "john.doe@gmail.com",
    "age": "50"
  },
  "2": {
    "name": "Jane Doe",
    "email": "jane.doe@hotmail.com",
    "age": "45"
  },
  "3": {
    "name": "Jack Doe",
    "email": "jack.doe@yahoo.com",
    "age": "21"
  },
  "4": {
    "name": "Jill Doe",
    "email": "jill.doe@mail.com",
    "age": "20"
  }
}
```

```bash
# Output
# Command Prompt or Bash Shell

$ node app.js
{
  "1": {
    "name": "John Doe",
    "email": "john.doe@gmail.com",
    "age": "50"
  },
  "2": {
    "name": "Jane Doe",
    "email": "jane.doe@hotmail.com",
    "age": "45"
  },
  "3": {
    "name": "Jack Doe",
    "email": "jack.doe@yahoo.com",
    "age": "21"
  },
  "4": {
    "name": "Jill Doe",
    "email": "jill.doe@mail.com",
    "age": "20"
  }
}
```

<h3 id="post_met"><b>📝 Write to Database</b></h3>

The `.post()` function adds a new entry to the JSON database. The function takes two arguments: the ID of the entry, and the data to be added. The ID is a unique identifier for the entry that is 100% required, and the data is the JSON Object to be added to the database under the given ID. The function triggers the `.on("add")` event, which is emitted when a new entry is added to the database.

```js
// File: app.js
// The main JavaScript file.

const JSON_DB = require("node-nosql-db"); // Import the module.
const userDB = new JSON_DB("./database/users.json"); // Create a new instance of the JSON_DB class.

// Add a new entry to the database.
userDB.post("5", {
  // The ID of the entry...
  name: "Hemil Patel",
  email: "hemilpatel2345@gmail.com", // ...and the data to be added.
  age: "23",
});

let data = userDB.loadDB(); // Load the new database snapshot in a variable.
console.log(data); // Print the data.
```

Assuming the database file will be the one in the [above example](#load_db), the output will be:

```bash
# Output
# Command Prompt or Bash Shell

$ node app.js
{
  "1": {
    "name": "John Doe",
    "email": "john.doe@gmail.com",
    "age": "50"
  },
  "2": {
    "name": "Jane Doe",
    "email": "jane.doe@hotmail.com",
    "age": "45"
  },
  "3": {
    "name": "Jack Doe",
    "email": "jack.doe@yahoo.com",
    "age": "21"
  },
  "4": {
    "name": "Jill Doe",
    "email": "jill.doe@mail.com",
    "age": "20"
  }
  "5": {
    "name": "Hemil Patel",
    "email": "hemilpatel2345@gmail.com",
    "age": "23"
  }
}
```

<h3 id="get_met"><b>🔍 Read from Database</b></h3>

The `.get()` function returns the data with the given ID. The function takes one argument: the ID of the entry. The function automatically filters the data with the given ID, and returns it as a JSON Object. This also enables us to work with the data in a more significant way. It can be used as a getter in a project like a RESTful API, where the API user can filter the data by only putting the ID of the entry in the URL as a query parameter. It also sends an error if the ID is not found in the database.

```js
// File: app.js
// The main JavaScript file.

const JSON_DB = require("node-nosql-db"); // Import the module.
const userDB = new JSON_DB("./database/users.json"); // Create a new instance of the JSON_DB class.

// Get the data with the given ID.
let data = userDB.get("1");
console.log(data); // Print the data.
```

Assuming the database file will be the one in the [above example](#load_db), the output will be:

```bash
# Output
# Command Prompt or Bash Shell

$ node app.js
{
  "name": "John Doe",
  "email": "john.doe@gmail.com",
  "age": "50"
}
```

<h3 id="put_met"><b>✍️ Update Database</b></h3>

The `.put()` function updates the data with the given ID. The function takes two arguments: the ID of the entry, and the data to be updated. The ID is a unique identifier for the entry that is 100% required, and the data is the JSON Object to be updated in the database under the given ID. The function triggers the `.on("update")` event, which is emitted when an entry is updated in the database.

```js
// File: app.js
// The main JavaScript file.

const JSON_DB = require("node-nosql-db"); // Import the module.
const userDB = new JSON_DB("./database/users.json"); // Create a new instance of the JSON_DB class.

// Update the data with the given ID.
userDB.put("1", {
  // The ID of the entry...
  age: "55", // ...and the data to be updated.
});

let data = userDB.loadDB(); // Load the new database snapshot in a variable.
console.log(data); // Print the data.
```

Assuming the database file will be the one in the [above example](#load_db), the output will be:

```bash
# Output
# Command Prompt or Bash Shell

$ node app.js
{
  "1": {
    "name": "John Doe",
    "email": "john.doe@gmail.com",
    "age": "55"
  },
  "2": {
    "name": "Jane Doe",
    "email": "jane.doe@hotmail.com",
    "age": "45"
  },
  "3": {
    "name": "Jack Doe",
    "email": "jack.doe@yahoo.com",
    "age": "21"
  },
  "4": {
    "name": "Jill Doe",
    "email": "jill.doe@mail.com",
    "age": "20"
  }
}
```

<h3 id="delete_met"><b>🗑 Delete from Database</b></h3>

The `.delete()` function deletes the data with the given ID. The function takes one argument: the ID of the entry. The function triggers the `.on("delete")` event, which is emitted when an entry is deleted from the database.
It permanently drops an entry from the database. So, as long as the entry is not added again, it will not be available in the database.

```js
// File: app.js
// The main JavaScript file.

const JSON_DB = require("node-nosql-db"); // Import the module.
const userDB = new JSON_DB("./database/users.json"); // Create a new instance of the JSON_DB class.

// Delete the data with the given ID.
userDB.delete("1");

let data = userDB.loadDB(); // Load the new database snapshot in a variable.
console.log(data); // Print the data.
```

Assuming the database file will be the one in the [above example](#load_db), the output will be:

```bash
# Output
# Command Prompt or Bash Shell

$ node app.js
{
  "2": {
    "name": "Jane Doe",
    "email": "jane.doe@hotmail.com",
    "age": "45"
  },
  "3": {
    "name": "Jack Doe",
    "email": "jack.doe@yahoo.com",
    "age": "21"
  },
  "4": {
    "name": "Jill Doe",
    "email": "jill.doe@mail.com",
    "age": "20"
  }
}
```

<h3 id="events"><b>📢 Events</b></h3>

```js
// File: app.js
// The main JavaScript file.

// Basic Setup.
const JSON_DB = require("node-nosql-db"); // Import the module.
const userDB = new JSON_DB("./database/users.json"); // Create a new instance of the JSON_DB class.

// On "add" event.
userDB.on("add", (newSnapshot, newId, dataAdded) => {
  console.log(`Added:\nID: ${newId}\nData:\n${dataAdded}`); // Print the data.

  // Print the new snapshot.
  console.log("New Snapshot:");
  console.log(newSnapshot);
});

// On "update" event.
userDB.on("update", (newSnapshot, oldSnapshot, id, dataUpdated) => {
  console.log(`Updated:\nID: ${id}\nData:\n${dataUpdated}`); // Print the data.

  // Print the old and new snapshots.
  console.log("Old Snapshot:");
  console.log(oldSnapshot);
  console.log("New Snapshot:");
  console.log(newSnapshot);
});

// On "delete" event.
userDB.on("delete", (newSnapshot, oldSnapshot, idDeleted, dataDeleted) => {
  console.log(`Deleted:\nID: ${id}\nData:\n${dataDeleted}`); // Print the data.

  // Print the old and new snapshots.
  console.log("Old Snapshot:");
  console.log(oldSnapshot);
  console.log("New Snapshot:");
  console.log(newSnapshot);
});
```

---

## 🔚 **The End**

I'll be adding more features to this library in the future. If you have any suggestions, please let me know. I'll be happy to add them. If you want to contribute, please feel free to fork the repository and make your own changes. Also, if you want to report a bug, please feel free to open an issue on the [GitHub repository](https://github.com/TheCodeHeist/json-db).

Anyways, have fun with this library!!! 😉

Made with ❤️ by [TheCodeHeist](https://github.com/TheCodeHeist/).
