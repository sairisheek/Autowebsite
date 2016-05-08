
//require statements
var express = require('express');
var app = express();
var pg = require('pg');
var flash    = require('connect-flash'); // store and retrieve messages in session store

var morgan       = require('morgan'); // loggervar bodyParser = require('body-parser');

var text;
var cookieParser = require('cookie-parser'); // parse cookies
var bodyParser   = require('body-parser'); // parse posts
var session      = require('express-session'); // session middleware
var port = process.env.PORT || 8080;
console.log(process.env.PWD);
console.log("Here is  dburl: "+process.env.DATABASE_URL);
var conString = process.env.DATABASE_URL;

app.set('views', __dirname + '/resources');


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(session({ secret: 'badbitchcontestyouinfirstplace' })); 

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