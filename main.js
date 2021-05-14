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






















app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });