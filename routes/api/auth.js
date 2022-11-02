const express = require('express');
const authRoute = express.Router();
const authController = require('../../controllers/authController')
authRoute.post('^/$|/api/auth?',authController.handleLogin);

module.exports = authRoute;