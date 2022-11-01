const db = require("../../model/rolesSequaliser");
const User = db.user;

const checkDuplicate = (req, res, next) => {
    let error = false;
    User.findOne({
        where: {
            username: req.body.user
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Username already taken!"
            });
            return; 
        }

        next();
    })

}

module.exports = checkDuplicate;