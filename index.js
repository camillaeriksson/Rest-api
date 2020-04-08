const Joi = require("joi");
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

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
