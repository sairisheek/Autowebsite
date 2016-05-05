var express = require('express');
var app = express();
var pg = require('pg');

var text;
var port = process.env.PORT || 8080;

console.log("Here is  dburl: "+process.env.DATABASE_URL);
pg.connect(process.env.DATABASE_URL, function(err, client, done) {
	client.query('SELECT * FROM master_table', function(err, result) {
	   done();
	   if(err) return console.error(err);
		text = result.rows;
	   });
	


	});



app.get('/', function(req, res){
	res.send(text);
});

app.listen(port, function(){
	console.log('Running! '+port);
});