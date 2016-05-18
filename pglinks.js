exports.createCustomer = function(sequelize,newUser){ 
sequelize.sync().success(function (err){
	var Customer = sequelize.import('./models/customer.js');
	Customer.create(newUser).success(function () {
        console.log('Customer: '+ newUser);
    
    	});
	});
}