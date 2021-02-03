const categoryLayer = require('../service/categoriesLayer')

class CategoryController {
	async getCategories(req, res ){
        try {
			res.send(await categoryLayer.findAll())
        }
        catch (e) {
            console.log('ERROR', e)
        }
	}
	async addCategory(req, res ){
        try {
			res.send(await categoryLayer.add(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
	}
	async getCategory(req, res ){
        try {
			res.send(await categoryLayer.find(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
	}
	async updateCategory(req, res ){
        try {
			res.send(await categoryLayer.update(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
	}
	async deleteCategory(req, res ){
        try {
			res.send(await categoryLayer.delete(req))
        }
        catch (e) {
            console.log('ERROR', e)
        }
	}
}

module.exports = new CategoryController()