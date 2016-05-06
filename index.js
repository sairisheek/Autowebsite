
//require statements
var express = require('express');
var app = express();
var pg = require('pg');
var router = express.Router();
var text;

var port = process.env.PORT || 8080;
console.log(process.env.PWD);
console.log("Here is  dburl: "+process.env.DATABASE_URL);
var conString = process.env.DATABASE_URL;

/*router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});
*/


app.get("/login",function(req,res){
  res.sendFile(process.env.PWD+"/resources/index.html");
});



//app.use("/",router);
app.use("/css", express.static(__dirname + '/resources/css'));
app.use("/fonts", express.static(__dirname + '/resources/fonts'));
app.use("/js", express.static(__dirname + '/resources/js'));
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