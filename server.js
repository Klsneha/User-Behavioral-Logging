var express = require('express');
var app = express(); //invoke express into a var app
var morgan=require('morgan');
var mongoose = require('mongoose');//handler for mongo database in nodejs.Using Mongoose we will connect to db
var port=process.env.PORT || 8080;
var bodyParser = require('body-parser');
var router=express.Router();
//importing the routes created
var appRoutes=require('./app/routes/api')(router);
var path=require('path'); //middle ware used to call required file path.
//this is how we use middleware in express app.use(). Morgan is used to log the req on the console
app.use(morgan('dev'));
//In order to parse json information with db we need below express middle ware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public')); //making all the front end html files available to server
app.use('/api',appRoutes); //using the defined backend routes http://localhost:8080/api/users

//name of the database is tutorial which is on the port 27017 
mongoose.connect('mongodb://localhost:27017/tutorial',function(err){
	if(err){
		console.log('Not connected to database:  '+err);
	}
	else
	{
		console.log('Successfully Connected to the database');
	}
	});

//When Server.js is called any kind of req is made it is routed to index.html

app.get('*',function(req,res){

res.sendFile(path.join(__dirname+ '/public/app/views/index.html'));
});

//This command is used to keep the server port on.
app.listen(port, function(){
	console.log("Running the server on the port "+port);
});
