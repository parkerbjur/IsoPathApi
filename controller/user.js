/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/userModel');
require('dotenv').config();

exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const user = new UserModel.User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
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

exports.login = (req, res) => {
  UserModel.User.findOne({ email: req.body.email }).then(
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
            process.env.TOKEN_SECRET,
            { expiresIn: '24h' },
          );
          res.status(200).json({
            username: user.username,
            userId: user._id,
            token,
          });
        },
      ).catch(
        (error) => {
          console.error(error);
          res.status(500);
        },
      );
    },
  ).catch(
    (error) => {
      console.error(error);
      res.status(500);
    },
  );
};

exports.authorize = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const { userId } = decodedToken;
    if (req.body.userId !== userId) {
      res.status(401).json({
        error: new Error('Invalid User Id'),
      });
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};
