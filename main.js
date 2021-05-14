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

// Ticket1

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
    
  }

  app.get("/articles",  getAllArticles);


// Ticket2





















app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });