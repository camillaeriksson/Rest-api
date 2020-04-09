const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());

app.get("/", (req, res) => res.send("Welcome!"));

app.get("/users", (req, res) => {
  let userData = fs.readFileSync("users.json");
  let users = JSON.parse(userData);
  res.send(users);
});

app.post("/users", (req, res) => {
  let userData = fs.readFileSync("users.json");
  let users = JSON.parse(userData);
  users.push(req.body);
  res.status(201);
  res.send();
  fs.writeFileSync("users.json", JSON.stringify(users));
});

app.get("/users/:id", (req, res) => {
  let userData = fs.readFileSync("users.json");
  let users = JSON.parse(userData);
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) res.status(404).send("The user was not found");
  res.send(user);
});

app.delete("/users/:id", (req, res) => {
  let userData = fs.readFileSync("users.json");
  let users = JSON.parse(userData);
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send("The user was not found");
  } else {
    users.splice(users.indexOf(user), 1);
  }
  res.send();
  fs.writeFileSync("users.json", JSON.stringify(users));
});

app.put("/users/:id", (req, res) => {
  let userData = fs.readFileSync("users.json");
  let users = JSON.parse(userData);
  let updatedUser = req.body;
  updatedUser.id = parseInt(req.params.id);
  const userIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  if (userIndex === -1) {
    res.status(404).send("The user was not found");
  } else {
    users[userIndex] = updatedUser;
  }
  res.send();
  fs.writeFileSync("users.json", JSON.stringify(users));
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
