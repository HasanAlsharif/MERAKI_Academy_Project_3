const express = require("express");
const fs = require("fs");
const axios = require("axios");
const morgan = require("morgan");

// DB======================
const {usersModel, articlesModel} = require("./schema");
const db = require("./db_project_3_v01");


const app = express();
const port = 5000;

/* ================================ */

// a middleware that enables us to read the received JSON data
app.use(express.json());

/* ================================= */

//*** http://localhost:5000/
app.get('/', (req, res) => {
  console.log('GET /');
  res.status(200);
  res.json('SERVER IS WORKING');
});


// *********************************************************************************************


// ================  2.A Ticket0 =====================

// Done

// ================  2.B Ticket1 =====================


const createNewAuthor = (req , res)=>{

  const {firstName, lastName, age, country, email, password} = req.body
  const newAuthor = new usersModel ({firstName, lastName, age, country, email, password})
  newAuthor.save()
  .then(result=> {res.status(201).json(result)})
  .catch(err =>{res.json(err)})

}

app.post("/users" , createNewAuthor)



// ================ 2.A Ticket1 =====================

  // {
  // "title" : "How I learn coding?",
  // "description" :
  // "Lorem, Quam, mollitia.",
  // "AuthorFirstname" : "Mohammad"
  // }

  // {
  //  "title": "Coding Best Practices",
  // "description":
  // "Lorem, ipsum dolor sit, Quam, mollitia.",
  // "AuthorFirstname": "Besslan"
  // }

  // {
  // "title": "Debugging",
  // "description":
  // "Lorem, Quam, mollitia.",
  // "AuthorFirstname": "Mohammad"
  // }
  


const createNewArticle = async (req,res) => {
  
  const {title, description , AuthorFirstname} = req.body
  
  let id;
  await usersModel.findOne({firstName: req.body.AuthorFirstname})
  .then(result=>{id = result._id})
  .catch(err=>{res.json(err)})
 
    const newArticle = new articlesModel ({ 
    title ,
    description ,
    author : id
   })

   
   newArticle.save()
   .then(result=> {res.status(201).json(result)})
   .catch(err =>{res.json(err)})

}

app.post("/articles",  createNewArticle);
//body: { "title": "How I learn coding?", "description": "Lorem, Quam, mollitia.", "AuthorFirstname": "Jouza" }



// ================ 2.A Ticket2 =====================

const getAllArticles = (req,res) => {


articlesModel.find({})
.then(result => {res.status(200).json(result)})
.catch(err => {res.status(404).json('error')})

}

app.get("/articles",  getAllArticles);


// ================ 2.A Ticket3 =====================


const getArticlesByAuthor = async (req,res) => {

  let id;
  await usersModel.find({firstName : req.query.author})
  .then(result => {id = result[0]._id })
  .catch(err=>{res.json(err)})
  console.log(id)
  articlesModel.find({author: id })
  .then(result => {res.status(200).json(result)})
  .catch(err => {res.status(404).json('error')})
  console.log(2)
}
  
  app.get("/articles/search_1",  getArticlesByAuthor);
  
// ================ 2.A Ticket4 =====================

















app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });