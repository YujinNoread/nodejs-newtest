const db = require("../models");

exports.findAll = () => {
	const products = db.product
	.findAll({
		attributes: {exclude:['createdAt','updatedAt']}
	});

	return products;
};

exports.addProduct = (req) => {

	const {products} = req.body
	const product = db.product.create(products)

	return product
};

exports.find = (req) => {
	
	const product = db.product
	.findOne({
		attributes: {exclude:['createdAt','updatedAt']},
		where: req.params
	})

	return product	
};

exports.update = async (req) => {
	
	const {products} = req.body
	await db.product
	.update(
		products,
		{where: req.params}
	)

	const product = db.product
	.findOne({
		attributes: {exclude:['createdAt','updatedAt']},
		where: req.params
	})

	return product	
};

exports.delete = async (req) => {
	
	db.product.destroy({ where: req.params })
	
	return ({status: "delete complete"});
};