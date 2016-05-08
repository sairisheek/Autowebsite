// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;

var Sequelize = require('sequelize');
var pg = require('pg');
var pghstore = require('pg-hstore');
var sequelize = new Sequelize(process.env.DATABASE_URL);

var User       = sequelize.import('./models/user');
User.sync();



module.exports = function(passport) {
	
	

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.customer_id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(customer_id, done) {
        User.findById(customer_id).then(function(user){
			done(null, user);
		}).catch(function(e){
			done(e, false);
		});
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, username, password, done) {		
			User.findOne({ where: { username: username }})
				.then(function(user) {
					if (!user) {
						done(null, false, req.flash('loginMessage', 'Unknown user'));
					} else if (!user.validPassword(password)) {
						done(null, false, req.flash('loginMessage', 'Wrong password'));
					} else {
						done(null, user);
					}
				})
				.catch(function(e) { 
					done(null, false, req.flash('loginMessage',e.name + " " + e.message));
				});				
	}));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, username, password, done) {        
		//  Whether we're signing up or connecting an account, we'll need
		//  to know if the email address is in use.
		if(req.body.regstring=='RandomassString'){
		User.findOne({ where: { username: username }})
			.then(function(existingUser) {
			
				 // check to see if there's already a user with that email
				if (existingUser) 
					return done(null, false, req.flash('signUpMessage', 'That username is already taken.'));

				//  We're not logged in, so we're creating a brand new user.
				else {
					if(req.user){
						req.logout();
					}

					// create the user
					var newUser = User.build ({username: username, password: password, customer_id: null});	
					newUser.save().then(function() {done (null, newUser);}).catch(function(err) { done(null, false, req.flash('signUpMessage', err));});
				}
			})
			.catch(function (e) {
				done(null, false, req.flash('signUpMessage',e.name + " " + e.message));				
			})

    }else{
    	return done(null, false, req.flash('signUpMessage', 'Wrong Registration Code.'));
    }

	}));
    

   
	
};

