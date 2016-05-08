module.exports = function(app,passport) {
var text;
var pg = require('pg');
//routing for GET /login
app.get("/login",function(req,res) {
  res.render('index.ejs', { message: req.flash('loginMessage') });
}); 





//routing for /home
app.get('/home',isLoggedIn, function(req,res){
	res.sendFile(__dirname+'/resources/search.html');
});

app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/home', // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));


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

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/login');
}