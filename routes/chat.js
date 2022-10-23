const express = require('express');
const chatRouter = express.Router();
const verifyJWT = require('../middleware/verifyJWT')
const path = require('path');

chatRouter.get('^/$|chat(.html)?', (req, res)=>{
    verifyJWT(req,res, res.sendFile(path.join(__dirname, '../views', 'chat.html')))
})

module.exports = chatRouter;