const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, ".")));

const pages = [
  "create-account",
  "create-form",
  "create-account-hobbies",
  "activities",
  "chat",
  "account",
  "buddy",
  "new-post",
];
const subpages = {
  account: [
    "settings",
    "profile",
    "privacy",
    "saved-posts",
    "applied-posts",
    "my-posts",
    "settings",
    "settings-account",
    "settings-app",
    "privacy-policy",
    "terms-of-use",
  ],
  activities: ["more-filters", "my-activities"],
  chat: ["message"],
  buddy: ["step2", "result"],
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
function requireAuth(req, res, next) {
  // For now, just continue - client-side will handle redirects
  // In a real app, you'd check session/cookies here
  next();
}

// Apply middleware to protected routes
const protectedPages = ["account", "new-post", "buddy", "chat"];

protectedPages.forEach((page) => {
  app.get(`/${page}`, requireAuth, (req, res) => {
    res.render("index", { page });
  });
});

// Handle subpages with protection
Object.entries(subpages).forEach(([mainPage, subs]) => {
  subs.forEach((subpage) => {
    if (protectedPages.includes(mainPage)) {
      app.get(`/${mainPage}/${subpage}`, requireAuth, (req, res) => {
        res.render("index", { page: mainPage, subpage });
      });
    } else {
      app.get(`/${mainPage}/${subpage}`, (req, res) => {
        res.render("index", { page: mainPage, subpage });
      });
    }
  });
});
