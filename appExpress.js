
var express = require('express')
var path    = require("path");
var bodyParser= require('body-parser')
var Stuff = require("./models/models.js");
var app = express();
//
// const { Client } = require('pg');
//
// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });
//
// client.connect();
//
// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });


app.set('view engine','ejs');
// app.set('views','./views')//dont need this
app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname,'images')))//dont need this
// app.use(express.static(path.join(__dirname,'css')))//dont need this
// app.use(express.static(path.join(__dirname,'SoundCloudAPIFinal')))//dont need this
// app.use(express.static(path.join(__dirname,'mySnake')))//dont need this
app.use(bodyParser.urlencoded({ extended: true })) //needed for comments/posts


// var Sequelize = require('sequelize');
// var sequelize = new Sequelize('postgres://yimd85@localhost:5432/bulletinboard');


// var Stuff = sequelize.define('boardpost', {
//   user: Sequelize.STRING(100),
//   post: Sequelize.TEXT
// });
//
//
// Stuff//creating first entry
// .sync()
// .then(function(){
//   Stuff.create({
//     user: 'MyspaceTom',
//     post: 'hello friend!'
//   });
// });
//




app.get('/gotoblog',function(request,response){
  Stuff.
    findAll()
      .then(function(rows){
          response.render('blog',{messages:rows});
        });
});

app.post('/gotoblog',function(request,response){
  Stuff
    .findAll()
      .then(function(){
        Stuff.create({
            user: request.body.user,
            post: request.body.post
        });
        response.redirect('/gotoblog')
  });
});





//render homepage
app.get('/',function(request,response){
  response.render('about_me')
})





//render links
app.get('/soundcloud',function(request,response){
  response.render('soundCloud')
})

app.get('/mysnake',function(request,response){
  response.render('snake')
})




//catch all
app.get('*',function(request,response){
  response.status(404).send('uh oh! page not found!')
})




//port
app.listen(process.env.PORT || 3000,function(){
  console.log('app is listening on port 3000');
})
