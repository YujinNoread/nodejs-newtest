const db = require("../models");

exports.findAll = () => {
	const categories = db.category
	.findAll({
		attributes: {exclude:['createdAt','updatedAt']}
	});

	return categories;
};

exports.add = (req) => {

	const {categories} = req.body
	const category = db.category.create(categories)

	return category
};

exports.find = (req) => {
	
	const category = db.category
	.findOne({
		attributes: {exclude:['createdAt','updatedAt']},
		where: req.params
	})

	return category	
};

exports.update = async (req) => {
	
	const {update} = req.body
	await db.category
	.update(
		update,
		{where: req.params}
	)

	const category = db.category
	.findOne({
		attributes: {exclude:['createdAt','updatedAt']},
		where: req.params
	})

	return category	
};

exports.delete = async (req) => {
	
	db.category.destroy({ where: req.params })
	
	return ({status: "delete complete"});
};