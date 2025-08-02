const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, ".")));

app.get("/", (req, res) => {
  res.render("index", { page: "activities" });
});

app.get("/activities", (req, res) => {
  res.render("index", { page: "activities" });
});

app.get("/chat", (req, res) => {
  res.render("index", { page: "chat" });
});

app.get("/account", (req, res) => {
  res.render("index", { page: "account" });
});

app.get("/buddy", (req, res) => {
  res.render("index", { page: "buddy" });
});

app.get("/new-post", (req, res) => {
  res.render("index", { page: "new-post" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
