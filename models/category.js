module.exports = (sequelize, DataTypes) => {
	const category = sequelize.define("category",{
		id: {type: DataTypes.INTEGER.UNSIGNED, primaryKey: true,autoIncrement: true,allowNull: false},	
		name: {type: DataTypes.STRING , allowNull: false}
	})
	
	return category;
};