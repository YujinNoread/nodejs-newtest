module.exports = (sequelize, DataTypes) => {
	const order = sequelize.define("order",{
		id: {type: DataTypes.INTEGER.UNSIGNED, primaryKey: true,autoIncrement: true,allowNull: false},	
		userId: {type: DataTypes.INTEGER , allowNull: false}
	})
	
	return order;
};