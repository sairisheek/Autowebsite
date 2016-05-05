var express = require('express');
var app = express();
var pg = require('pg');
var router = express.Router();
vat text;

var port = process.env.PORT || 8080;

console.log("Here is  dburl: "+process.env.DATABASE_URL);
var conString = process.env.DATABASE_URL;

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/login",function(req,res){
  res.sendFile("resources/index.html");
});

app.get('/', function(req, res){
	var client = new pg.Client(conString);
	client.on('drain', client.end.bind(client));
	client.connect();
	var query = client.query("SELECT * FROM master_table");
	query.on('row', function(row){
		 text = row;
	})


	res.send(text);
});

app.listen(port, function(){
	console.log('Running! '+port);
});