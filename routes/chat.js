const express = require('express');
const chatRouter = express.Router();
//const verifyJWT = require('../middleware/verifyJWT')
const roleVerify = require('../controllers/verification/roleVerify');
const path = require('path');

chatRouter.get('^/$|chat(.html)?',
[
    roleVerify.verifyToken,
    roleVerify.isUser
],
 (req, res)=>{
    res.sendFile(path.join(__dirname, '../views', 'chat.html'))
})

module.exports = chatRouter;