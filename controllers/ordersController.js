const ordersLayer = require('../service/ordersLayer')

class OrdersController {
	async getOrders(req, res ){
        try {
			res.send(await ordersLayer.findAll(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
    }
    async addOrders(req, res ){
        try {
			res.send(await ordersLayer.add(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
    }
    async getOrder(req, res ){
        try {
			res.send(await ordersLayer.find(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
    }
    async updateOrder(req, res ){
        try {
			res.send(await ordersLayer.update(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
    }
    async deleteOrder(req, res ){
        try {
			res.send(await ordersLayer.delete(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
    }
}

module.exports = new OrdersController()