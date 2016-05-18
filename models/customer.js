module.exports = function(sequelize, DataTypes) {
	return sequelize.define('customer', {
		customer_id		: {
 	type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  		},
		customer_name		: DataTypes.STRING,
		vin_data		: DataTypes.TEXT,
		
		
	}, 
	{
		omitNull: true,
		tableName: 'master_table',
		freezeTableName : true,
		timestamps: false,
		
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