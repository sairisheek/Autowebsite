exports.createCustomer = function(sequelize,newUser,done){ 

	var Customer = sequelize.import('./models/customer.js');
	Customer.sync();
	var customer = Customer.build(newUser);
	customer.save().then(function(){done(true);}).catch(function(error){done(false,error);});
	
}