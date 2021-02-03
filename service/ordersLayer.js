require('dotenv').config({ path: '../.env' });
const db = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = +process.env.SALT_ROUNDS;
const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');

exports.findAll = async (req) => {
	const {id, isAdmin} = jwt.verify(req.headers.authorization, secret);
	let result=[];
	if(!isAdmin){
		const orders = await db.order
		.findAll({
		attributes: {exclude:['updatedAt']},
		where: {user_id : id}
		});
		
	for (const order of orders) {
		const orderProducts = await db.orderProduct.findAll({
			attributes: ['product.id', 'product.name','orderProduct.count','orderProduct.price'],
			where: {order_id: order.id},
			include: {model: db.product, raw: true}
		});
		result.push({order_id: order.id, order_user: order.user_id, order_price: order.totalPrice, order_products: orderProducts})
	}

	return result;
	}

	const orders = await db.order
	.findAll();

	for (const order of orders) {
		const orderProducts = await db.orderProduct.findAll({
			attributes: ['product.id', 'product.name','orderProduct.count','orderProduct.price'],
			where: {order_id: order.id},
			include: {model: db.product, raw: true}
		});
		result.push({order_id: order.id, order_user: order.user_id, order_price: order.totalPrice, order_products: orderProducts})
	}

	return result;
};

exports.add = async (req) => {
	const {id, isAdmin} = jwt.verify(req.headers.authorization, secret);
	let result=[];
	let dbProductsTest=[];
	let dbProducts=[];
	const {products} = req.body;
	if(!isAdmin){
		
		for(let product of products){
			dbProductsTest = await db.product.findOne({where: {id: product.id}})
			if(!dbProductsTest){
				return ({error: `productId = ${product.id} is not exist`})
			}
			dbProducts.push(dbProductsTest)
		}

		const order = await db.order.create({
			userId: id,
		})
		
		for (const userProduct of products) {
			const product= await db.product.findOne({where: {id: userProduct.id}})
			await db.orderProduct.create({
				orderId: order.id,
				productId: userProduct.id,
				count: userProduct.count,
				totalPrice: product.price * userProduct.count
			})
		}

		return ({order:"created", order_id: order.id})
	}

	const {userId} = req.body

	for(let product of products){
			console.log(product.id);
			
			dbProductsTest = await db.product.findOne({where: {id: product.id}})
			if(!dbProductsTest){
				return ({error: `productId = ${product.id} is not exist`})
			}
			dbProducts.push(dbProductsTest)
		}

		const order = await db.order.create({userId})
		
		for (const userProduct of products) {
			const product= await db.product.findOne({where: {id: userProduct.id}})
			await db.orderProduct.create({
				orderId: order.id,
				productId: userProduct.id,
				count: userProduct.count,
				totalPrice: product.price * userProduct.count
			})
		}

	return ({order:"created", order_id: order.id})
};
exports.find = async (req) => {
	try{
		const {id}= jwt.verify(req.headers.authorization, secret);

		const order = await db.order
		.findOne({
		attributes: {exclude:['updatedAt']},
		where: {userId : id, id: req.params.id}
		})
	
		const orderProducts = await db.orderProduct.findAll({
			attributes: ['product.id', 'product.name','orderProduct.count','orderProduct.totalPrice'],
			where: {orderId: order.id},
			include: {model: db.product, raw: true}
		});
	
		return {order_id: order.id, orderPrice: order.totalPrice, order_products: orderProducts};
	}
	catch(e){
		return ({ERROR:"нет доступа к заказу"})
	}
};

exports.update = async (req) => {
	const {update} = req.body

	for(let element of update){
		await db.orderProduct.update(element,{ where: {orderId : req.params.id, productId: element.productId} })
		const product= await db.product.findOne({where: {id: element.productId}})
		await db.orderProduct.update({totalPrice: product.price*element.count},{ where: {orderId : req.params.id, productId: element.productId} })
	}

	const orderProducts = await db.orderProduct.findAll({
		where: {orderId: req.params.id},
	});

	return {orderId: req.params, order_products: orderProducts};	
};

exports.delete = async (req) => {

	await db.order.destroy({where: req.params})

	await db.orderProduct.destroy({where: {orderId: req.params.id}})

	return {status: "delete complete"};
};