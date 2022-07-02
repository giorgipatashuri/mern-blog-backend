import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import userModule from '../modules/userModule.js';
import jwt from 'jsonwebtoken';

export const registration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const Hesh = await bcrypt.hash(password, salt);

    const doc = new userModule({
      email: req.body.email,
      fullName: req.body.fullName,
      imgURL: req.body.imgURL,
      passwordHesh: Hesh,
    });
    const user = await doc.save();

    const { passwordHesh, ...userDate } = user._doc;
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );
    res.json({
      ...userDate,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json('problems with registration');
  }
};
export const login = async (req, res) => {
  try {
    const user = await userModule.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        massage: 'login faild',
      });
    }
    const passIsVaild = await bcrypt.compare(req.body.password, user._doc.passwordHesh);
    if (!passIsVaild) {
      return res.status(400).json({
        massage: 'Invalid Login or Password',
      });
    }
    const { passwordHesh, ...userDate } = user._doc;
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );
    res.json({
      ...userDate,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json('problems with login');
  }
};
export const Me = async (req, res) => {
  try {
    const user = await userModule.findById(req.userId);
    if (!user) {
      return res.json({
        massage: 'Cannot access',
      });
    }
    const { passwordHesh, ...userDate } = user._doc;
    res.json(userDate);
  } catch (error) {
    console.log(error);
    res.json({
      massage: 'cannot access1',
    });
  }
};
