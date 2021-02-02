/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
  UserModel.findOne({ email: req.body.email }).then(
    (user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error('User not found!'),
        });
      }
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password!'),
            });
          }
          const token = jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' },
          );
          res.status(200).json({
            userId: user._id,
            token,
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
  ).catch(
    (error) => {
      res.status(500).json({
        error,
      });
    },
  );
};
