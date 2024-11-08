const express= require("express");
const app = express();
const bodyparser = require('body-parser');
const exhbs = require('express-handlebars');

app.engine('hbs',exhbs.engine({layoutsDir:'views/',defaultLayout:"main",extname:"hbs"}))
app.set('view engine','hbs');
app.set('views','views');
const dbo = require('./db');
app.use(bodyparser.urlencoded({extended:true}));


app.get('/', async(req,res)=>{
  let database = await dbo.grtDatabase();
  const collection = database.createCollection('books');
  const cursor = (await collection).find({})
  let books = await cursor.toArray();

let message = "";
switch (req.query.status) {
  case '1':
    message= "Inserted successfully!";
    break;

  default:
    break;
}
  

 res.render('main',{message,books})
})

app.post("/store_book", async (req, res) => {
  let database = await dbo.grtDatabase();
  const collection = database.collection("books");
  let book = { title: req.body.title, author: req.body.author };
  await collection.insertOne(book);
  return res.redirect("/?status=1");
});





app.listen(8000,()=>{
    console.log("Listening to 8000 port");
})