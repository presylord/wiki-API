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
  content: String,
};

const Article = mongoose.model("articles", articleSchema);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
