// file app/models/user.js
// define the model for User 




module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		localusername		: DataTypes.STRING,
		localpassword		: DataTypes.STRING,
		
	}, 
	{
		
		instanceMethods: {			
			validPassword : function(password) {
				return password == this.localpassword
			}
		},
		getterMethods: {
			someValue: function() {
				return this.someValue;
			}
		},
		setterMethods: {
			someValue: function(value) {
				this.someValue = value;
			}
		}
	});
}