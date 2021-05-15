
/*
const deleteArticlesByAuthor = (req, res, next) => {

    const found = articles.find((element) => {
     
      return element.author === req.body.author
    })
  
    if (found) {
    
       articles = articles.filter(element => element.author !== req.body.author)
       
        
       const deletemessageauth = { 
        success : true ,
        message : `Success Delete all articles of the author => ${req.body.author}`
        }
  
       res.status(200).json(deletemessageauth)
       next()
      
           
  }else {
  
    throw "Error"
  
  }
  
  app.delete("/articles" ,deleteArticlesByAuthor);
  
  */