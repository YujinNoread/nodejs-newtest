const express = require('express')
const router = express.Router();
const controller = require('../controllers/authContoller');

//localhost:5000/api/v1/auth

router.post("/registration", controller.registration);
router.post("/login", controller.login);

module.exports = router;