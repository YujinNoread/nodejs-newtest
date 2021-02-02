require('dotenv').config({ path: '../.env' });
const db = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = +process.env.SALT_ROUNDS;
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config')

const generateAccessToken = (id, isAdmin) => {
    const payload = {
        id,
        isAdmin
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class AuthController {
    async registration(req,res){
		const {firstName,lastName,email,password} = req.body;
		
        const hash = bcrypt.hashSync(password, saltRounds);
        try {
            const newUser = await db.user.create({
                email,
                firstName,
                lastName,
                password:hash,
                groupId: 1,
                isAdmin: 0
			})
			res.send({registration: "complete", login: newUser.email})
        }
        catch (e) {
            console.log(e)
        }
    }
    async login(req,res){
        const {email,password} = req.body;

        try {
			const user = await db.user.findOne({where: {email: email}})

			if(!user){
				return res.status(403).json({message: `Пользователь ${user} не найден`});
			}

			const validPassword = bcrypt.compareSync(password, user.password);

			if(!validPassword){
				return res.status(403).json({message: `Введен неверный пароль`});
			}

			const token = generateAccessToken(user.id, user.isAdmin);

			res.send({login:"login success", token:token});
        }
        catch (e) {
            console.log(e)
        }
	}
}

module.exports = new AuthController()