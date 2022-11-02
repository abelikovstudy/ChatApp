
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../model/rolesSequaliser')
const Role = db.ROLES;
const User = db.user;

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd)
        return res.status(400).json({
            message: 'Login and password are required'
        });
    try {
        User.findOne({
            where: {
                username: user
            }
        }).then(usr => {
            if (!usr) {
                return res.status(401).send({ message: "User not found" })
            }
    
            let validPassword = bcrypt.compareSync(pwd, usr.password)
    
            if (!validPassword) {
                res.status(401).send({
                    accesToken: null,
                    message: "Password is invalid!"
                })
            }
            
            let cookieOptions = {
                path:"/",
                sameSite:true,
                maxAge: 1000 * 60 * 60 * 24, 
                httpOnly: true, 
            }
        

            let token = jwt.sign({
                id: usr.id
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: 60 * 60 * 24 * 1000
            })
            let roleList = []
            usr.getRoles().then(roles =>{
                for( let i = 0; i < roles.length; i++){
                    roleList.push("ROLE_" + roles[i].name.toUpperCase())
                }
                res.cookie('x-access-token',token, cookieOptions)
                res.cookie('roles',JSON.stringify(roleList), cookieOptions) 
                res.status(200).redirect('/chat')

            })
        })    
    }
    catch(err){
        res.status(500).json({
            'message': `Server error: ${err.message}`
        })
    }
 
}

module.exports = { handleLogin };