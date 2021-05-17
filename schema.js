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



const usersexp = mongoose.model("user", users);
const articlesexp = mongoose.model("article", articles);
module.exports.usersexp = usersexp
module.exports.articlesexp = articlesexp

//"User" & "article " here is the module wich will be shown in MongoDB compass with added s
