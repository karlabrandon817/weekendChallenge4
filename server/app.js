var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var urlEncodedParser = bodyParser.urlencoded({extended: true});
var port = process.env.PORT || 8080;

//connection string to database named "todolist"
//table named "todolist"
//columns in "todolist:" "id", "task" (text), "status"(boolean)
var connectionString = 'postgres://localhost:5432/todolist';

app.use(express.static('public')); //static folder

app.listen(port, function(req, res){
  console.log('listening on', port);
});//end spin up server

//base url
app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('views/index.html'));
});//end base url

app.post('/addToList', urlEncodedParser, function(req, res){
  console.log('addToList req.body...',  req.body);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      console.log('connected to the database');
      client.query('INSERT INTO todolist(task, status) values ($1, $2)', [req.body.task, req.body.status]);
      done();
      res.send('yay!');
    }//end if else statement
  });//end connection to database
});
