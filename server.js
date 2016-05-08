
//require statements
var express = require('express');
var app = express();
var pg = require('pg');
var flash    = require('connect-flash'); // store and retrieve messages in session store

var morgan       = require('morgan'); // logger
var bodyParser = require('body-parser');
var text;

var port = process.env.PORT || 8080;
console.log(process.env.PWD);
console.log("Here is  dburl: "+process.env.DATABASE_URL);
var conString = process.env.DATABASE_URL;



app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.use(morgan('dev'));
app.use(flash());

// loading static files
app.use("/css", express.static(__dirname + '/resources/css'));
app.use("/fonts", express.static(__dirname + '/resources/fonts'));
app.use("/js", express.static(__dirname + '/resources/js'));

require('./routes.js')(app);


app.listen(port, function(){
	console.log('Running! '+port);
});