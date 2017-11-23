module.exports = function(app,passport,sequelize) {

var text;
var pg = require('pg');
var pglink = require('./pglinks.js');


//routing for GET /login
app.get("/login",function(req,res) {
  res.render('index.ejs', { message: req.flash('loginMessage') });
}); 


//routing for /register
app.get('/register',function(req,res){
	if(isLoggedIn){req.logout();}
	res.render('register.ejs',{ message: req.flash('signUpMessage') });
});


//routing for /home
app.get('/home',isLoggedIn, function(req,res){
	res.sendFile(__dirname+'/resources/search.html');
});

//routing for /home
app.get('/add',isLoggedIn, function(req,res){
	res.render('add.ejs',{ message: req.flash('addMessage') });
});


//routing for post /add
app.post('/add',isLoggedIn, function(req,res){
	res.render('add.ejs',{ message: req.flash('addMessage') });
	var newUser={
        fname: req.body.first_name,
        lname: req.body.last_name,
    	vin_data: req.body.VIN 
    };
	console.log(newUser);
	pglink.createCustomer(sequelize,newUser,function(flag,err){
		if(flag){req.flash('addMessage','User '+newUser.fname+' ' + newUser.lname+' created with VIN ' + newUser.vin_data+'!');
    	}
	else{
    
    	req.flash('addMessage',err);}


	});
});


//routing for auth
app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/home', // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));
app.post('/register', passport.authenticate('local-signup', {
			successRedirect : '/login', // redirect to the secure profile section
			failureRedirect : '/register', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

// routing for root
app.get('/', function(req, res){
	res.render('index.ejs',{ message: req.flash('loginMessage') })
});

//routing for logout
app.get('/logout',function(req,res){
	req.logout();
	res.redirect('/');
}); 


};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/login');



