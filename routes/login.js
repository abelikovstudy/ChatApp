const express = require('express');
const loginRouter = express.Router();
const path = require('path');

loginRouter.get('^/$|/login(.html)?', (req, res) =>{
    res.sendFile(
        path.join(__dirname, '..', 'views', 'login.html')
    )
});

module.exports = loginRouter;