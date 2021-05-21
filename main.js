const express = require("express");
const fs = require("fs");
const axios = require("axios");
const morgan = require("morgan");

// DB======================
const { usersModel, articlesModel , commentsModel, rolesModel } = require("./schema");
const db = require("./db_project_3_v01");

// .env ======================
const bcrypt = require("bcrypt")
require("dotenv").config();
const jwt = require("jsonwebtoken");
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

// ================ 3.A Ticket 0 =====================

const DB_URI = process.env.DB_URI
const SECRET = process.env.SECRET

// ================ 3.A Ticket 1 =====================

const createNewAuthor =  (req, res) => {

  const { firstName, lastName, age, country, email, password } = req.body;

// first way check schema , also dont forget the require of bcrypt
// second way here : 

  // 1. make async in the function above and await bfore bcrypt because its always erequire some time
  // const salt = 10;
  // const hashedpassword =  await bcrypt.hash(password , salt)

  const newAuthor = new usersModel({
    firstName,
    lastName,
    age,
    country,
    email,
    password
  });

 
  console.log(newAuthor)

    newAuthor.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.json(err);
    });

   
};

app.post("/users", createNewAuthor);



// {
//   "firstName" : "Mohammad",
//   "lastName" : "Jouza",
//   "age" : 27,
//   "country" : "Jordan",
//   "email" : "CEO@MERAKI-Academy.org",
//   "password" : "12345678"
// }

// ================ 3.A Ticket 2 =====================
/*
const login = async (req,res) =>{

  const { email , password} = req.body

  let found;
  let match;
  //findOne() returns object , find() returns array
  await usersModel.findOne({email : email.toLowerCase()})
  .then( (result) => {
    found = result;
    bcrypt.compare(password, found.password, (err, result) => {
      // result will be a boolean depending on whether the hashedPassword is made using the password provided
    match = result
    if (match) {
    
          const payload = {
          
          userId: found._id,
          country: found.country

         
        };
        const options = {
          expiresIn: "3600000",
        };
        const Token = jwt.sign(payload, SECRET, options);
        res.status(200).json({ Token : Token})
      
  
    }else{res.status(403).json({message : "password incorrect" , status : 404 })}
  
    });
  })
  .catch((err) => {
  res.status(404).json({message : "email not exist" , status : 404 });
  });
  
}

app.post ("/login" , login)


// {
//   "email" : "CEO@MERAKI-Academy.org",
//   "password" : "12345678"
// }

*/
// ================ 3.A Ticket 3 =====================

const authentication = (req,res,next) => {
 
  const token = req.headers.authorization.split(" ")[1]

   jwt.verify(token, SECRET, (err, result) => {

    if(err){ return res.json({ Message : "invalide" , status : 403 })}

    next()
    });
};


app.post ("/articles/:id/comments",authentication ,(req,res) => {

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

})

// commenter is  user  => 60a2fd7f3f7b7c54bc7f9ec3
// id is the artcle => 60a4dc43623fa341d07ef49d

// {
//   "comment" : "great article",
//   "commenter" : "60a2fd7f3f7b7c54bc7f9ec3"
// }

// ================ 3.B Ticket 1 ====================
// done 

// ================ 3.B Ticket 2 done ====================

// ================ 3.B Ticket 3  ====================


// app.post("/creatRole" , (req, res) =>{

//   req.body



// })



const login = async (req,res) =>{

  const { email , password} = req.body

  let found;
  let match;
  //findOne() returns object , find() returns array
  await (await usersModel.findOne({email : email.toLowerCase()})).populate("role").exec()
  .then( (result) => {
    found = result;
    bcrypt.compare(password, found.password, (err, result) => {
      // result will be a boolean depending on whether the hashedPassword is made using the password provided
    match = result
    if (match) {
    
          const payload = {
          
          userId: found._id,
          country: found.country,
          role : found.role
         
        };
        const options = {
          expiresIn: "3600000",
        };
        const Token = jwt.sign(payload, SECRET, options);
        res.status(200).json({ Token : Token})
      
  
    }else{res.status(403).json({message : "password incorrect" , status : 404 })}
  
    });
  })
  .catch((err) => {
  res.status(404).json({message : "email not exist" , status : 404 });
  });
  
}

app.post ("/login" , login)


// {
//   "email" : "CEO@MERAKI-Academy.org",
//   "password" : "12345678"
// }












app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
