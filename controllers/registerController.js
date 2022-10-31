const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const db = require('../model/rolesSequaliser')

const Roles = db.ROLES;
const Users = db.user;
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
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
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
                        user.setRoles(roles).then(() => {
                            res.status(200).json({ message: "User was registered successfully!" });
                        });
                    });
                } else {
                    user.setRoles([1]).then(() => {
                        res.status(200).json({ message: "User was registered successfully!" });
                    });
                }
            }).catch(err => {
                res.status(500).send({message : err.message})
            })

    }
    catch (err) {
        res.status(500).json({
            'message': `Server error: ${err.message}`
        })
    }
}

module.exports = { handleNewUser };