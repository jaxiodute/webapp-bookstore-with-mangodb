const express=require("express");
const bodyparser=require("body-parser");
const app=express();
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/bookDB', {useNewUrlParser: true});
app.use(bodyparser.urlencoded({extended:true}));
app.listen(3000,function(){
  console.log("Server started at port 3000");
});
app.set('view engine', 'ejs');
const booksschema={
  name:String,
  about:String
};
const Book = mongoose.model("Book",booksschema);

const book1 = new Book({
  name:"Welcome"
});
const book2 = new Book({
  name:"Add"
});
const book3 = new Book({
  name:"Delete"
});

const bookItems=[book1,book2,book3];
app.get("/",function(req,res){
  Book.find({},function(err,foundItems){
    res.render("home",{
      books:foundItems,
    });
  });

  });
app.get("/add",function(req,res){

  res.render("add");
});
app.post("/add",function(req,res){
  const bookName = req.body.title;
  const bookAbout =req.body.about
const book=new Book({
  name:bookName,
  about:bookAbout
});
book.save();
  res.redirect("/");

});
app.get("/delete",function(req,res){
  res.render("delete");
});
app.post("/delete",function(req,res){
  var deletebook=req.body.title;
  console.log(deletebook);
  Book.deleteOne({name:deletebook},function(err)
  {
    console.log("Entered");
    if(err)
    {
      console.log(err);
    }
    else
    {
      console.log("Deleted Successfully");
    }
  });
  res.redirect("/");

});
app.get("/book/:topic",function(req,res){
  var title=req.params.topic;
  Book.find({},function(err,foundItems){
    foundItems.forEach(function(item){
      if(item.name===title)
      {
        res.render("book",{
          title:item.name,
          about:item.about
        });
      }
    });
  });

});
