const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: "Swarnalatha" },
  { id: 2, name: "Ravi" }
];
app.get("/", (req, res) => {
  res.send("Welcome to the User API");
});
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.json(newUser);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
