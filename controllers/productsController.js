const productsLayer = require('../service/productsLayer')

class ProductsController {
	async getProducts(req, res ){
        try {
			res.send(await productsLayer.findAll())
        }
        catch (e) {
            console.log('ERROR', e)
        }
	}
	async addProducts(req, res ){
        try {
			res.send(await productsLayer.addProduct(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
	}
	async getProduct(req, res ){
        try {
			res.send(await productsLayer.find(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
	}
	async updateProduct(req, res ){
        try {
			res.send(await productsLayer.update(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
	}
	async deleteProduct(req, res ){
        try {
			res.send(await productsLayer.delete(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
	}
}

module.exports = new ProductsController()