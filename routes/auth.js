const express = require('express');
const authRoute = express.Router();
const authController = require('../controllers/authController')
const path = require('path');

authRoute.post('/',authController.handleLogin);

module.exports = authRoute;