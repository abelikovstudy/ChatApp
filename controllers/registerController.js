
const bcrypt = require('bcrypt');
const db = require('../model/rolesSequaliser')

const Role = db.ROLES;
const User = db.user;
const Op = db.Sequelize.Op;

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
     if (!user || !pwd) return res.status(400).json(
        {
            'message': 'Username and password are required'
        }
    ); 
    try {
        User.create({
            username: user,
            password: bcrypt.hashSync(pwd, 8)
        })
            .then(user => {
                if (req.body.roles) {
                    Role.findAll({
                        where: {
                            name: {
                                [Op.or]: req.body.roles
                            }
                        }
                    }).then(roles => {
                        user.setRoles(roles)
                    });
                } else {
                    user.setRoles([1])
                }

            })
            res.status(200).json({ message: "User was registered successfully!" });
    }
    catch (err) {
        res.status(500).json({
            'message': `Server error: ${err.message}`
        })
    }
}

module.exports = { handleNewUser };