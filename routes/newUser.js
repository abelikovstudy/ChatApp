const express = require('express');
const newUserRouter = express.Router();
const registerController = require('../controllers/registerController')
const path = require('path');

newUserRouter.post('/',registerController.handleNewUser);

module.exports = newUserRouter;