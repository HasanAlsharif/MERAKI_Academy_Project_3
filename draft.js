  const deleteArticlesyAuthor = (req, res, next) => {
  let deleted = false;
  const articles = [{ author: "mhmd" , author: "ali" author: "ali"} ];

  // use it when you don't have a return value
  // req.body.author=ali
  articles.forEach((element, i) => {
    if (element.author === req.body.author) {
      articles.splice(i, 1);
      deleted = true;
    }
  });

  if (deleted)
  {
      const deletemessageauth = {
    success: true,
    message: `Success Delete all articles of the author => ${req.body.author}`,
  };
  res.status(200).json(deletemessageauth);
  }
  else{
    const deletemessageauth = {
        success: false,
        message: `Fail Delete all articles of the author => ${req.body.author}`,
      };
      res.status(404).json(deletemessageauth);
  }

  

  next();
};
// }else {

//   throw "Error"

// }

app.delete("/articles", deleteArticlesByAuthor);

// =====================================================================
/* hashedpass

bcrypt.hash(password , salt).then(err, hashedPassword =>{


})
 
  
orrr

 const fun = async (password) {

    const salt =10
    
    const hashedPassword = await bcrypt.hash(password , salt)

    bcrypt.compare(password, hashedPassword, (err, result) => {
        // result will be a boolean depending on whether the hashedPassword is made using the password provided
    console.log(result)
    });
  
  }
  

      
})





*/