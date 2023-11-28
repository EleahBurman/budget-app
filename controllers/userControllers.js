import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

//@desc Register a user
//@route POST /api/users/register
//@access Public

export const registerUser = (req, res) => {
  console.log("This is req body: ", req.body);

  const {username, email, password, passwordConfirmation} = req.body;

  if(password !== passwordConfirmation) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  if(!username || !email || !password || !passwordConfirmation) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  User.findOne({email})
    .then(userAvailable => {
      if (userAvailable) {
        return res.status(400).json({ message: 'User already exists' });
      }

      //Hash password
      return bcrypt.hash(password, 10);
    })
    .then(hashedPassword => {
      console.log("Hashed Password: ", hashedPassword);
      return User.create({
        username,
        email,
        password: hashedPassword
      });
    })
    .then(user => {
      console.log(`User created ${user}`);
      if (user){
        res.status(201).json({
          _id: user.id,
          email: user.email,
        });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err.message
      });
    });
};

//@desc Login a user
//@route POST /api/users/login
//@access Public
export const loginUser = (req, res) => {
  const {email, password} = req.body;
  if(!email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  User.findOne({email})
    .then(user => {
      if(user && bcrypt.compare(password, user.password)) {
        const accessToken = jsonwebtoken.sign(
          {
            user: {
              username: user.username,
              email: user.email,
              id: user.id
            },
          }, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1h'})
        res.status(200).json({accessToken})
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err.message
      });
    });
};

//@desc Login a user
//@route POST /api/users/current
//@access private
export const currentUser = async (req, res) => {
  try {
    res.json({
      message: 'Current user information'
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: err
    });
  }
};