const express = require('express')
const router = express.Router();
const controller = require('../controllers/productsController');
const roleMiddleware = require('../middleware/roleMiddleware.js');
const productValidator = require('../validators/ProductValidator')


//localhost:5000/api/v1/products

router.get("/", (...args) => controller.getProducts(...args));
router.post("/", roleMiddleware(true),productValidator.validProductFields, controller.addProducts);
router.get("/:id", controller.getProduct);
router.put("/:id", roleMiddleware(true),productValidator.validProductFields, controller.updateProduct);
router.delete("/:id", roleMiddleware(true), controller.deleteProduct);

module.exports = router;