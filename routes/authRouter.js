const express = require('express')
const router = express.Router();
const controller = require('../controllers/authContoller');
const registerValidator = require('../validators/RegisterValidator')

//localhost:5000/api/v1/auth

router.post("/registration",registerValidator.validRegister, controller.registration);
router.post("/login", controller.login);

module.exports = router;