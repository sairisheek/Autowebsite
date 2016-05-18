exports.createCustomer = function(sequelize,newUser){ 

	var Customer = sequelize.import('./models/customer.js');
	Customer.sync();
	var customer = Customer.build(newUser);
	customer.save().then(function () {
        console.log('Customer: '+ newUser);
    
    	});
	
}