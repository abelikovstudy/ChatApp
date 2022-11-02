const express = require('express');
const newUserRouter = express.Router();
const registerController = require('../../controllers/registerController')
const roleController = require('../../controllers/verification/roleVerify')
const checkDuplicate = require('../../controllers/verification/registerVeify')

newUserRouter.post('^/$|/api/newUser?',
[    checkDuplicate,
    roleController.checkRolesExisted

],
registerController.handleNewUser);

module.exports = newUserRouter;