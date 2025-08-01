const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, ".")));

app.get("/", (req, res) => {
  res.render("index", {
    currentPage: "index",
  });
});

app.get("/:viewname", (req, res) => {
  const viewname = req.params.viewname;
  res.render("index", {
    body: viewname,
    currentPage: viewname,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
