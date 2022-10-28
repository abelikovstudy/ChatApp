const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('../model/rolesSequaliser')

const Roles = db.ROLES;
const Users = db.user;
const handleNewUser = async (req, res) => {
    const {user, pwd} = req.body;
    if(!user || !pwd ) return res.status(400).json(
        {
            'message' : 'Username and password are required'
        }
    );
    const duplicate = userDB.users.find(user => user.username === user);
    if(duplicate) return res.sendStatus(409);
    try{
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newUser = {
            "username" : user,
            "password" : hashedPwd
        }
        userDB.setUsers([...userDB.users, newUser]);
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(userDB.users));
        res.status(201).json({
            'success' : `New user created: ${user}`
        });
    }
    catch(err){
        res.status(500).json({
            'message' : `Server error: ${err.message}`
        })
    }
}

module.exports = {handleNewUser};