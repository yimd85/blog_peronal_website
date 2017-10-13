var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://yimd85@localhost:5432/bulletinboard');

var express = require('express')
var path    = require("path");
var bodyParser= require('body-parser')
var app = express();




app.set('view engine','ejs');
app.set('views','./views')
app.use(express.static(path.join(__dirname,'images')))
app.use(express.static(path.join(__dirname,'css')))
app.use(express.static(path.join(__dirname,'SoundCloudAPIFinal')))
app.use(express.static(path.join(__dirname,'mySnake')))
app.use(bodyParser.urlencoded({ extended: true })) //needed for comments/posts




//databasestuff
var Stuff = sequelize.define('boardpost', {
  user: Sequelize.STRING(100),
  post: Sequelize.TEXT
});

Stuff//creating first entry
.sync()
.then(function(){
  Stuff.create({
    user: 'MyspaceTom',
    post: 'hello friend!'
  });
});

app.get('/gotoblog',function(request,response){
  Stuff.
    findAll()
      .then(function(rows){
          response.render('blog',{messages:rows});
        });
});

app.get('/addshit',function(request,response){
  response.render('addMessages')
});

app.post('/addshit',function(request,response){
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
app.listen(3000,function(){
  console.log('app is listening on port 3000');
})
