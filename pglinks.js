exports.createCustomer = function(sequelize,newUser,req){ 

	var Customer = sequelize.import('./models/customer.js');
	Customer.sync();
	var customer = Customer.build(newUser);
	customer.save().then(function () {
        req.flash('addMessage','User '+newUser.fname+' ' + newUser.lname+' created with VIN ' + newUser.vin_data+'!');
    
    	}).catch(function(err){req.flash('addMessage',err);});
	
}