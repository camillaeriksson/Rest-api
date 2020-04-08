const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const users = [
  { id: 1, firstname: "Lars", lastname: "Bengtsson", age: "45" },
  { id: 2, firstname: "Ellen", lastname: "Skoglund", age: "19" },
  { id: 3, firstname: "Malin", lastname: "Karlsson", age: "28" },
  { id: 4, firstname: "Bengt", lastname: "Lilja", age: "55" },
];

app.get("/", (req, res) => res.send("Welcome!"));

app.get("/users", (req, res) => res.send(users));

app.post("/users", (req, res) => {
  users.push(req.body);
  res.status(201);
  res.send();
});

app.get("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) res.status(404).send("The user was not found");
  res.send(user);
});

app.delete("/users/:id", (req, res) => {
  users.splice(parseInt(req.params.id - 1), 1);
  res.send();
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
