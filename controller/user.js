const bcrypt = require('bcrypt');
const UserModel = require('../model/userModel');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        passwor: hash,
      });
      user.save().then(
        () => {
          res.status(201).json({
            message: 'User Added',
          });
        },
      ).catch(
        (error) => {
          res.status(500).json({
            error,
          });
        },
      );
    },
  );
};

exports.login = (req, res, next) => {

};
