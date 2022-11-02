const db = require("../../model/rolesSequaliser");
var jwt = require("jsonwebtoken");
const ROLES = db.ROLES;
const User = db.user;
require('dotenv').config();

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist: " + req.body.roles[i]
        });
        return;
      }
    }
  }

  next();
};

const verifyToken = (req, res, next) => {
  let token = req.cookies['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => { // Secret!
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;

  });
  next();
};


const isUser = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (req.body.roles == null) {
      res.status(403).send({
        message: "Require Role!"
      });
      return;
    }
    if(user === null)
    {
      res.status(403).send({
        message: "Require Role!"
      });
      return;
    }
    else{
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "user") {
            next();
            return;
          }
        }
  
        return;
      });
    }

  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (req.body.roles == null) {
      res.status(403).send({
        message: "Require Role!"
      });
      next();
      return;
    }
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      return;
    });
  });
};

const isModerator = (req, res, next) => {

  User.findByPk(req.userId).then(user => {

    if (req.body.roles == null) {
      res.status(403).send({
        message: "Require Role!"
      });
      return;
    }

    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

const isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const roleController = {
  checkRolesExisted,
  verifyToken,
  isUser,
  isAdmin,
  isModerator,
  isModeratorOrAdmin
}

module.exports = roleController;
