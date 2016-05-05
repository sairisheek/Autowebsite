var express = require('express');
var app = express();
var pg = require('pg');


var port = process.env.PORT || 8080;

console.log(process.env.DATABASE_URL);
pg.connect(process.env.DATABASE_URL, function(err, client, done) {
	client.query('SELECT * FROM master_table', function(err, result) {
	   done();
	   if(err) return console.error(err);
	   console.log(result.rows);
	   });
	


	});



app.get('/', function(req, res){
	res.send('Hello world!');
});

app.listen(port, function(){
	console.log('Running! '+port);
});