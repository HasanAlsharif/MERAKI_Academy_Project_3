const mongoose = require("mongoose");

const users = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  country: String,
  email: String,
  password: String,
});

const articles = new mongoose.Schema({
  title: String,
  description: String,
  author: { type: mongoose.Schema.ObjectId, ref: "users" },
});



const usersModel = mongoose.model("user", users);
const articlesModel = mongoose.model("article", articles);
module.exports.usersModel = usersModel
module.exports.articlesModel = articlesModel

//"User" & "article " here is the module wich will be shown in MongoDB compass with added s
