const express = require('express')
const router = express.Router();
const controller = require('../controllers/ordersController');
const roleMiddleware = require('../middleware/roleMiddleware.js');

//localhost:5000/api/v1/orders

router.get("/", roleMiddleware(), (...args) => controller.getOrders(...args));
router.post("/", roleMiddleware(), controller.addOrders);
router.get("/:id", roleMiddleware(), controller.getOrder);
router.put("/:id", roleMiddleware(true), controller.updateOrder);
router.delete("/:id", roleMiddleware(true), controller.deleteOrder);


module.exports = router;