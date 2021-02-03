const express = require('express')
const router = express.Router();
const controller = require('../controllers/categoriesController');
const roleMiddleware = require('../middleware/roleMiddleware.js');
const categoryValidator = require('../Validators/CategoryValidator');

//localhost:5000/api/v1/products-categories

router.get("/", (...args) => controller.getCategories(...args));
router.post("/",categoryValidator.validCategoryName, roleMiddleware(true), controller.addCategory);
router.get("/:id", controller.getCategory);
router.put("/:id", roleMiddleware(true), categoryValidator.validCategoryName, controller.updateCategory);
router.delete("/:id", roleMiddleware(true), controller.deleteCategory);

module.exports = router;