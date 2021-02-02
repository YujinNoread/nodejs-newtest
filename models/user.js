module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define("user",{
		id: {type: DataTypes.INTEGER.UNSIGNED, primaryKey: true,autoIncrement: true,allowNull: false},	
		firstName: {type: DataTypes.TEXT('tiny') , allowNull: false},
		lastName: {type: DataTypes.TEXT('tiny') , allowNull: false},
		email: {type:DataTypes.STRING,allowNull: false, unique: true},
		password: {type: DataTypes.STRING , allowNull: false},
		groupId: {type: DataTypes.INTEGER.UNSIGNED , allowNull: false},
		isAdmin: { type: DataTypes.BOOLEAN, allowNull: true },
	});
	return user;
};