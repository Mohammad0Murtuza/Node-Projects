const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const book1 =
  "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry’s eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!";
const dailyProphet =
  "There is one of the best wizarding newspaper in Britain, discounting such small circulation publications such as *The Quibbler*. The *Daily Prophet*, whose headquarters are in Diagon Alley, is delivered by owl on a daily basis to nearly every wizarding household in Britain(now all over the world). Payment is effected by placing coins in the pouch tied to the paper-owl’s leg. Occasionally (when something particularly interesting or exciting happens) an Evening Prophet edition will be rushed out.";
const contactDailyProphet =
  "To contact Daily Prophet mali me at wizardingavengers@gmail.com";
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    philosphersStone: book1,
    posts: posts,
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutDailyProphet: dailyProphet });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactDailyProphet: contactDailyProphet });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});
app.post("/compose", function (req, res) {
  const newPost = {
    postTitle: req.body.postTitle,
    postBody: req.body.postBody,
  };
  posts.push(newPost);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  const requestedPost = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const postTitle = _.lowerCase(post.postTitle);
    if (postTitle == requestedPost) {
      console.log(postTitle);
      res.render("post", {
        heading: post.postTitle,
        body: post.postBody,
      });
      res.redirect("post");
    }
  });
});

app.listen(8000, function () {
  console.log("Server started on port 8000");
});
