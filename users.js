var pg           = require('pg');



var client = new pg.Client(process.env.DATABASE_URL);



function User(){
    this.c_id = 0;
    this.username = "";
    this.password= ""; //need to declare the things that i want to be remembered for each user in the database
}

User.findOne = function(username, callback){

    var client = new pg.Client(process.env.DATABASE_URL);

    var isNotAvailable = false; //we are assuming the username is taking
    //var username = this.username;
    //var rowresult = false;
    console.log(username + ' is in the findOne function test');
    //check if there is a user available for this username;
    client.connect();
   

    client.query("SELECT * from authentication_table where username=$1", [username], function(err, result){
        if(err){
            return callback(err, isNotAvailable, this);
        }
        //if no rows were returned from query, then new user
        if (result.rows.length > 0){
            isNotAvailable = true; // update the user for return in callback
            ///username = username;
            //password = result.rows[0].password;
            console.log(username + ' is am not available!');
        }
        else{
            isNotAvailable = false;
            //username = username;
            console.log(username + ' is available');
        }
        //the callback has 3 parameters:
        // parameter err: false if there is no error
        //parameter isNotAvailable: whether the username is available or not
        // parameter this: the User object;

        client.end();
        return callback(false, isNotAvailable, this);


    });
}

User.findById = function(id, callback){
    console.log("we are in findbyid");
 
    var client = new pg.Client(process.env.DATABASE_URL);

    client.connect();
    client.query("SELECT * from authentication_table where customer_id=$1", [id], function(err, result){

        if(err){
            return callback(err, null);
        }
        //if no rows were returned from query, then new user
        if (result.rows.length > 0){
            console.log(result.rows[0] + ' is found!');
            var user = new User();
            user.username= result.rows[0]['username'];
            user.password = result.rows[0]['password'];
            user.c_id = result.rows[0]['customer_id'];
            console.log(user.email);
            return callback(null, user);
        }
    });
};



module.exports = User;
