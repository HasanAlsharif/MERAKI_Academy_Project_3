const bcrypt = require("bcrypt")


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
  comments: [mongoose.Schema.ObjectId],
});


const comments = new mongoose.Schema({
  comment: String,
  commenter: mongoose.Schema.ObjectId,
});



users.pre("save", async function(){
  this.email = this.email.toLowerCase();
  const salt = 10;
  this.password =  await bcrypt.hash(this.password , salt)

})



const usersModel = mongoose.model("user", users);
const articlesModel = mongoose.model("article", articles);
const commentsModel = mongoose.model("comment" , comments)
module.exports.usersModel = usersModel;
module.exports.articlesModel = articlesModel;
module.exports.commentsModel = commentsModel;

//"User" & "article " here is the module witch will be shown in MongoDB compass with added s
// usersModel and articlesModel are used for creating the model in main.js
