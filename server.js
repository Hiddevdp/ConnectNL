const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, ".")));

const pages = ["activities", "chat", "account", "buddy", "new-post"];
const subpages = {
  account: ["settings", "profile", "privacy"],
  activities: ["more-filters", "my-activities"],
  chat: ["message"],
};

app.get("/", (req, res) => {
  res.render("index", { page: "activities" });
});

// Routing for main pages
pages.forEach((page) => {
  app.get(`/${page}`, (req, res) => {
    res.render("index", { page });
  });
});

// Routing for subpages
Object.entries(subpages).forEach(([mainPage, subs]) => {
  subs.forEach((subpage) => {
    app.get(`/${mainPage}/${subpage}`, (req, res) => {
      res.render("index", { page: mainPage, subpage });
    });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
