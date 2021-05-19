const express = require("express");
const fs = require("fs");
const axios = require("axios");
const morgan = require("morgan");

// DB======================
const { usersModel, articlesModel , commentsModel } = require("./schema");
const db = require("./db_project_3_v01");

// .env ======================

require("dotenv").config();

/* ================================ */
const app = express();
const port = 5000;

/* ================================ */

// a middleware that enables us to read the received JSON data
app.use(express.json());

/* ================================= */

//*** http://localhost:5000/
app.get("/", (req, res) => {
  console.log("GET /");
  res.status(200);
  res.json("SERVER IS WORKING");
});

// *********************************************************************************************

// ================  2.A Ticket0 =====================

// Done

// ================  2.B Ticket1 =====================

const createNewAuthor = (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;
  const newAuthor = new usersModel({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
  });
  newAuthor
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

app.post("/users", createNewAuthor);

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

const createNewArticle = async (req, res) => {
  const { title, description, AuthorFirstname } = req.body;

  let id;
  await usersModel
    .findOne({ firstName: req.body.AuthorFirstname })
    .then((result) => {
      id = result._id;
    })
    .catch((err) => {
      res.json(err);
    });

  const newArticle = new articlesModel({
    title,
    description,
    author: id,
  });

  newArticle
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

app.post("/articles", createNewArticle);
//body: { "title": "How I learn coding?", "description": "Lorem, Quam, mollitia.", "AuthorFirstname": "Jouza" }

// ================ 2.A Ticket2 =====================

const getAllArticles = (req, res) => {
  articlesModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json("error");
    });
};

app.get("/articles", getAllArticles);

// ================ 2.A Ticket3 =====================

const getArticlesByAuthor = async (req, res) => {
  let id;
  await usersModel
    .find({ firstName: req.query.author })
    .then((result) => {
      id = result[0]._id;
    })
    .catch((err) => {
      res.json(err);
    });
  console.log(id);
  articlesModel
    .find({ author: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json("error");
    });
  console.log(2);
};

app.get("/articles/search_1", getArticlesByAuthor);

// ================ 2.A Ticket4 =====================

const getAnArticleById = async (req, res) => {
  articlesModel
    .find({ author: req.query.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json("error");
    });
  console.log(2);
};

app.get("/articles/search_2", getAnArticleById);

// ================ 2.A Ticket5 =====================

const updateAnArticleById = (req, res) => {
  const { title, description, author } = req.body;
  //  instead of
  // title: req.body.title ,
  // description: req.body.description,
  // author : req.body.author

  // make   const { title, description, author } = req.body; , then write the object directly
  // {
  // title : title
  // description: description,
  // author: author,
  // } ==> but this also can be written like this {title,description,author}

  articlesModel
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        title,
        description,
      }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json("error");
    });
};

app.put("/articles/:id", updateAnArticleById);

// ================ 2.A Ticket6 =====================

const deleteAnArticleById = (req, res) => {
  articlesModel
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

app.delete("/articles/:id", deleteAnArticleById);

// ================ 2.A Ticket 7 =====================

const deleteArticlesByAuthor = (req, res) => {
  articlesModel
    .deleteMany({ author: req.body.author })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

app.delete("/articles", deleteArticlesByAuthor);


// ================ 2.A Ticket 8 =====================

// done


// ================ 2.B Ticket 2 =====================


const login = (req,res) =>{

  const logdata = { email : "ceo@meraki-academy.org" , password : "12345678" }


  if(req.body.email === logdata.email && req.body.password === logdata.password) {

    res.status(200).json("Valid login credentials")

  }else{

    res.status(401).json("Invalid login credentials")

  }

}

app.post ("/login" , login)


// ================ 2.B Ticket 3 =====================

const createNewComment = (req,res) =>{

    const {comment , commenter} = req.body

    const newComment = new commentsModel ({
      comment,
      commenter
    })

    newComment.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.json(err);
    });

}

//983u9tpfj3hbrgkn3j49089
app.post ("/articles/:id/comments" , createNewComment)

// commenter is  user  => 60a2fd7f3f7b7c54bc7f9ec3
// id is the artcle => 60a4dc43623fa341d07ef49d

// {
//   "comment" : "great article",
//   "commenter" : "60a2fd7f3f7b7c54bc7f9ec3"
// }


// ================ 3.A Ticket 0 =====================

const DB_URI = process.env.DB_URI
const SECRET = process.env.SECRET
















app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
