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


/* ================================= */

// *********************************************************************************************


// ================  1. Ticket2 =====================

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


//================ 1. Ticket3 =====================

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



// ================  1.Ticket5 =====================

const updateAnArticleById = (req, res, next) => {
  
  const indexid = articles.findIndex ( element => element.id == req.params.id )
  
    
    if(req.body.title) {
      articles[indexid].title = req.body.title
    }

    if(req.body.description) {
      articles[indexid].description = req.body.description
    }

    if(req.body.author) {
      articles[indexid].author = req.body.author
    }
    
 
res.status(200).json(articles[indexid])
next()

}

app.put("/articles/:id" ,updateAnArticleById);




// ================ 1. Ticket6 =====================

const deleteAnArticleById = (req, res, next) => {
  let i
  const found = articles.find((element, index) => {
    i = index
    return element.id == req.params.id
  })


  if (found) {

    articles.splice(i,1)
    const deletemessage = { 
      success : true ,
      message : `Success Delete article with id => ${req.params.id}`
    }
  
    res.status(200).json(deletemessage)
    next()

  } else {

    throw "Error"

  }

}

app.delete("/articles/:id" ,deleteAnArticleById);


// ================  1.Ticket7 =====================


const deleteArticlesByAuthor = (req, res, next) => {

  const found = articles.find((element) => {
   
    return element.author === req.body.author
  })

    if (found) {
    
      // another way:
      // articles = articles.filter(element => element.author !== req.body.author)
      // then make articles (let) not const
      

      articles.forEach((element,i) =>{
        if (element.author === req.body.author)
          articles.splice(i,1)
         })

      const deletemessageauth = { 
        success : true ,
        message : `Success Delete all articles of the author => ${req.body.author}`
        }

      res.status(200).json(deletemessageauth)
      next()
      
          
    }else {

      throw "Error"

    }
}

app.delete("/articles" ,deleteArticlesByAuthor);



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

const getAllArticles = (req,res,next) => {

  res.status(200).json(articles);
  next()
}

app.get("/articles",  getAllArticles);
















app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });