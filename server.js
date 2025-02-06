const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let users = [
  { firstName: "John", lastName: "Doe", designation: "Designer" },
  { firstName: "Jame", lastName: "sm", designation: "coder" },
  { firstName: "Alice", lastName: "abc", designation: "ui ux" },
];

app.get("/users", (req, res) => {
  const { firstName, lastName, designation } = req.query;

  if (firstName && lastName && designation) {
    const filteredUsers = users.filter((user) =>
      user.firstName.toLowerCase().includes(firstName.toLowerCase())
    );
    return res.json(filteredUsers);
  }
  return res.json(users);
});
    
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (!newUser.firstName || !newUser.lastName || !newUser.designation) {
    return res
      .status(400)
      .json({ error: " Please provide the required fields"});
  }

  users.push(newUser);
  return res.status(201).json(newUser);
});

app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
});