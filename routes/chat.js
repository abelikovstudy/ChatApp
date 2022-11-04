const express = require('express');
const chatRouter = express.Router();
const roleVerify = require('../controllers/verification/roleVerify');
const path = require('path');

chatRouter.get('^/$|chat(.html)?',
[
    roleVerify.verifyToken,
    roleVerify.isUser

],
 (req, res)=>{
    console.log(req.cookies)    
    res.sendFile(path.join(__dirname, '../views', 'chat.html'))
})

module.exports = chatRouter;