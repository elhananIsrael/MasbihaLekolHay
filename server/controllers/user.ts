import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import User from '../models/user';
import BaseCtrl from './base';

export default class UserCtrl extends BaseCtrl {
  model = User;

  login = (req, res) => {
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token });
      });
    });
  }

  googleLogin = (req, res, next) => {
    const userData = req.body;

    this.model.findOne({ email: userData.email }, (err, user) => {

      if (user) {
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token });
      } else {
        const newUserData: any = {};
        newUserData.username = userData.email.split('@')[0];
        newUserData.email = userData.email;
        newUserData.role = 'customer'; //only customer can use google login

        const obj = new this.model(newUserData);
        obj.save((err, item) => {
          // 11000 is the code for duplicate key error
          if (err && err.code === 11000) {
            res.sendStatus(400);
          }
          if (err) {
            return console.error(err);
          }
          const token = jwt.sign({ user: item }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
          res.status(200).json({ token: token });
        });

      }

    });
  }

}
