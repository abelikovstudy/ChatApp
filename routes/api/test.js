const express = require('express');
const roleVerify = require('../../controllers/verification/roleVerify')
const test = express.Router();
const jwt = require('jsonwebtoken');
let username = '999'

test.post('^/$|/api/auth?',
    roleVerify.verifyToken, 
    (req,res) =>{
        jwt.verify(req.cookies['x-access-token'], process.env.ACCESS_TOKEN_SECRET, (err, decoded) => { // Secret!
            req.userId = decoded.id;

            username = decoded.uname
        
          });
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('message', (msg) => {
      console.log(`We got message: ${msg}`)
      io.emit('message', `${username}: ${msg}`)
    }) 

})

module.exports = test
