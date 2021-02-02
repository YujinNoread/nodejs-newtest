const userLayer = require('../service/usersLayer')

class UsersController {
	async getUsers(req, res ){
        try {
			res.send(await userLayer.findAll())
        }
        catch (e) {
            console.log('ERROR', e)
        }
	}
	async getUser(req, res ){
        try {
			res.send(await userLayer.find(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
	}
	async getProfile(req, res){
        try {
            res.send(await userLayer.profile(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
	}
	async addUser(req, res){
        try {
			res.send(await userLayer.addUser(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
	}
	async updateUser(req, res){
        try {
			res.send(await userLayer.updateUser(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
	}
	async deleteUser(req, res){
        try {
			res.send(await userLayer.deleteUser(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
	}
}

module.exports = new UsersController()