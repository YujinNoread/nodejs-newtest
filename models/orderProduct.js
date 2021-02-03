module.exports = (sequelize, DataTypes) => {
	const orderProduct = sequelize.define("orderProduct",{
		id: {type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false},
		orderId: {type: DataTypes.INTEGER , allowNull: false},
		productId: {type: DataTypes.INTEGER , allowNull: false},
		count: {type:DataTypes.INTEGER, allowNull: false},
		totalPrice: {type:DataTypes.DECIMAL(10, 2).UNSIGNED,allowNull: false},
	})
	orderProduct.associate = models => {
		orderProduct.belongsTo(models.product,{
			foreignKey: 'productId'
		})
	}

	return orderProduct;
};