module.exports = (sequelize, DataTypes) => {
	const product = sequelize.define("product",{
		id: {type: DataTypes.INTEGER.UNSIGNED, primaryKey: true,autoIncrement: true,allowNull: false},	
		name: {type: DataTypes.STRING , allowNull: false},
		description: {type: DataTypes.TEXT , allowNull: false},
		price: {type:DataTypes.DECIMAL(10, 2).UNSIGNED,allowNull: false},
		category: {type: DataTypes.INTEGER , allowNull: false}
	})
	product.associate = models => {
		product.hasMany(models.orderProduct,{
			foreignKey: 'id'
		})
	}
	
	return product;
};