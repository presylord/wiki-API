//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
  title: {
    type: String,
    required: true,
  },
  article: String,
};

const Article = mongoose.model("articles", articleSchema);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app
  .route("/articles")
  .get(function (req, res) {
    Article.find({}, function (err, result) {
      if (!err) {
        res.send(result);
      } else {
        res.send(err);
      }
    });
  })
  .post(function (req, res) {
    var title = req.body.title;
    var article = req.body.article;
    var newArticle = new Article({
      title: title,
      article: article,
    });
    newArticle.save();
    res.send("Article Saved");
  })
  .delete(function (req, res) {
    Article.deleteMany({}, function (err) {
      if (!err) {
        res.send("All entries deleted successfully.");
      }
    });
  });

app.route("/get").get(function (req, res) {});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
