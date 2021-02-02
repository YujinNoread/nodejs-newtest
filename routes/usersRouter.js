const { request } = require('express');
const express = require('express')
const router = express.Router();
const controller = require('../controllers/usersController');
const roleMiddleware = require('../middleware/roleMiddleware.js');

//localhost:5000/api/v1/users

router.get("/", roleMiddleware(true), (...args) => controller.getUsers(...args));
router.get("/profile", roleMiddleware(),controller.getProfile);
router.get("/:id", roleMiddleware(true),controller.getUser);
router.post("/", roleMiddleware(true),controller.addUser);
router.put("/:id", roleMiddleware(true),controller.updateUser);
router.delete("/:id", roleMiddleware(true),controller.deleteUser);

module.exports = router;