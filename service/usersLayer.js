require('dotenv').config({ path: '../.env' });
const db = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = +process.env.SALT_ROUNDS;
const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');


exports.findAll = () => {
	const users = db.user.findAll({attributes: {exclude:['password']}});

	return users;
};

exports.find = (req) => {
	const user = db.user.findOne({
		attributes: {exclude:['password']},
		where: req.params
	})

	return user	
};

exports.profile = (req) => {
	const {id} = jwt.verify(req.headers.authorization, secret);
	const user = db.user.findOne({
		attributes: ['firstName', 'lastName', 'email'],
		where: {id}
	})

	return user	
};

exports.addUser = (req) => {
	const {firstName, lastName, email, password, groupId, isAdmin} = req.body
	const hash = bcrypt.hashSync(password, saltRounds);
	const user = db.user.create({
		firstName,
		lastName,
		email,
		password:hash,
		groupId,
		isAdmin
	})

	delete user.dataValues.password

	return user
};

exports.updateUser = async (req) => {
	const {update} = req.body
	console.log(update);
	
	await db.user.update(update,{ where: req.params })
	
	return db.user.findOne({where: req.params , attributes: {exclude:['password']} });
};

exports.deleteUser = (req) => {

	db.user.destroy({ where: req.params })
	
	return ({status: "delete complete"});
};
