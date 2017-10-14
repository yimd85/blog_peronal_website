var Sequelize = require('sequelize');
// var sequelize = new Sequelize('postgres://yimd85@localhost:5432/bulletinboard');


if (process.env.DATABASE_URL) {
  var sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  var sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
  });
}



//databasestuff
var Stuff = sequelize.define('boardpost', {
  user: Sequelize.STRING(100),
  post: Sequelize.TEXT
});


// Stuff//creating first entry
// .sync()
// .then(function(){
//   Stuff.create({
//     user: 'MyspaceTom',
//     post: 'hello friend!'
//   });
// });

Stuff.sync();

module.exports = Stuff;


//heroku addons:create heroku-postgresql:hobby-dev
//heroku config
