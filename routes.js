module.exports = function(app) {

var pg = require('pg');
//routing for GET /login
app.get("/login",function(req,res) {
  res.render('index.ejs', { message: req.flash('loginMessage') });
}); 





//routing for /home
app.get('/home', function(req,res){
	res.sendFile(__dirname+'/resources/search.html');
});


// routing for root
app.get('/', function(req, res){
	var client = new pg.Client(process.env.DATABASE_URL);
	client.on('drain', client.end.bind(client)); //after queries have completed, close the pool
	client.connect();
	var query = client.query("SELECT * FROM master_table");
	query.on('row', function(row){
		 text = row;
	});
	res.send(text);
});

};