const express = require('express');
const registerRouter = express.Router();
const registerController = require('../controllers/registerController');
const path = require('path');

registerRouter.get('^/$|register(.html)?', (req, res) =>{
    res.sendFile(
        path.join(__dirname, '..', 'views', 'register.html')
    )
});

module.exports = registerRouter;