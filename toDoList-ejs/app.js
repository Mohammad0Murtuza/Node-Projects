const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

tasks = [];
workTasks = [];

app.get("/", function (req, res) {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const day = today.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: day, newListTask: tasks });
});

app.post("/", function (req, res) {
  newTask = req.body.newTask;
  if (req.body.list === "Work") {
    workTasks.push(newTask);
    res.redirect("/work");
  } else {
    tasks.push(newTask);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListTask: workTasks });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server Is Up");
});
