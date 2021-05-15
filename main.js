const express = require("express");
const fs = require("fs");
const axios = require("axios");
const morgan = require("morgan");

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


/* ================================= */

// ================  Ticket1 =====================

const articles = [
  {
  id: 1,
  title: 'How I learn coding?',
  description:
  'Lorem, Quam, mollitia.',
  author: 'Jouza',
  },
  {
  id: 2,
  title: 'Coding Best Practices',
  description:
  'Lorem, ipsum dolor sit, Quam, mollitia.',
  author: 'Besslan',
  },
  {
  id: 3,
  title: 'Debugging',
  description:
  'Lorem, Quam, mollitia.',
  author: 'Jouza',
  },
  ];

 const getAllArticles = (req,res,next) => {

    res.status(200).json(articles);
    next()
  }

  app.get("/articles",  getAllArticles);



// ================  Ticket2 =====================

const getArticlesByAuthor = (req,res,next) => {
  
  const author = articles.filter(element => element.author === req.query.author);
  
    if (author.length) {
       res.status(200).json(author);

    } else {
   
        res.status(404).json("Author not found");
  }
  next()
}

app.get("/articles/search_1",  getArticlesByAuthor);




//================  Ticket3 =====================
const getAnArticleById = (req,res,next) => {
  
  const authorbyid = articles.filter(element => element.id == req.query.id);
  
    if (authorbyid.length) {
       res.status(200).json(authorbyid);

    } else {
   
        res.status(404).json("id not found");
  }
  next()
}

app.get("/articles/search_2",  getAnArticleById);



// ================  Ticket4 =====================
const { uuid } = require('uuidv4');

const createNewArticle = (req,res,next) => {
  
 let newid = uuid()

    for(let i = 0; i<articles.length; i++) {
      if (newid == articles[i].id ){

        newid = uuid();

      }
    }

  const newArticle = { 
    title : req.body.title,
    description :  req.body.description,
    author : req.body.author,
    id: newid
  }

  articles.push(newArticle);

  
  res.status(201).json(newArticle);
  next()

 
 
}

app.post("/articles",  createNewArticle);




// ================  Ticket5 =====================

const updateAnArticleById = (req, res, next) => {


res.status(200).json()

}

app.put("/articles/:id" ,createNewArticle );













app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });