// file app/models/user.js
// define the model for User 




module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		customer_id		: {
 	type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  		},
		username		: DataTypes.STRING,
		password		: DataTypes.STRING,
		
		
	}, 
	{
		tableName: 'authentication_table',
		freezeTableName : true,
		timestamps: false,
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