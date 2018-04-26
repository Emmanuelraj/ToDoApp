var express = require('express');

var app= express();

var mongoose  =require('mongoose');

//
var bodyParser = require('body-parser');

// import the controller

var controller = require('./controller/ToDoController');

//setting the view engine
app.set('view engine','ejs');


//middleware for bodyParser
app.use(bodyParser.urlencoded({extended : false}));

app.use(bodyParser.json());


mongoose.connect('mongodb://test:test@ds257579.mlab.com:57579/todoappli');



var db  = mongoose.connection;

db.on('error',function(err)
{
     if(err)
      {
        console.log('err'+err);
      }
});

db.once('open',function()
{
   console.log('connected to mlab db');
});


//
controller(app);

app.use(express.static('public'));

app.listen('3000');

console.log('server listen to the port');
