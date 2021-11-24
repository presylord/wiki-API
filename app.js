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

app
  .route("/articles/:reqTitle")
  .get(function (req, res) {
    const reqTitle = req.params.reqTitle;
    Article.findOne({ title: reqTitle }, function (err, result) {
      if (result) {
        res.write(result.title);
        res.write(result.article);
        res.send();
      } else {
        res.send("Not Found.");
      }
    });
  })
  .put(function (req, res) {
    const reqTitle = req.params.reqTitle;
    Article.updateOne(
      { title: reqTitle },
      {
        title: "Spider-man!",
        article:
          "With Spider-Man's identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. When Peter asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
      },
      function (err) {
        if (!err) {
          console.log("Updated");
        } else {
          console.log(err);
        }
      }
    );
  })
  .patch(function (req, res) {
    Article.updateOne(
      { title: req.params.reqTitle },
      { $set: { article: "Testing Patch" } },
      function (err) {
        if (!err) {
          console.log("Patch Applied");
        } else {
          console.log(err);
        }
      }
    );
  })
  .delete(function (req, res) {
    Article.deleteOne({ title: req.params.reqTitle }, function (err) {
      if (!err) {
        console.log("Deleted Successfully");
      } else {
        console.log(err);
      }
    });
  });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
