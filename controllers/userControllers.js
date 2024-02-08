import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';


export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, refreshToken: 0 }); // Exclude password and refreshToken from the response
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
//@desc Register a user
//@route POST /api/users/register
//@access Public

/**
 * @param {string} value: passwordValue
 */
const checkPasswordValidity = (value) => {
  const isNonWhiteSpace = /^\S*$/;
  const isContainsUppercase = /^(?=.*[A-Z]).*$/;
  const isContainsLowercase = /^(?=.*[a-z]).*$/;
  const isContainsNumber = /^(?=.*[0-9]).*$/;
  const isContainsSymbol = /^(?=.*[!@#$%^&*()_+=?.,:;[\]{}|~]).*$/;
  const isValidLength = /^.{5,}$/; // Adjusted minimum length to 5 characters

  const errors = [];

  if (!isNonWhiteSpace.test(value)) {
    errors.push("Password must not contain whitespaces");
  }

  if (!isContainsUppercase.test(value)) {
    errors.push("Password must have at least one uppercase character");
  }

  if (!isContainsLowercase.test(value)) {
    errors.push("Password must have at least one lowercase character");
  }

  if (!isContainsNumber.test(value)) {
    errors.push("Password must contain at least one digit");
  }

  if (!isContainsSymbol.test(value)) {
    errors.push("Password must contain at least one special symbol");
  }

  if (!isValidLength.test(value)) {
    errors.push("Password must be at least 5 characters long");
  }

  return errors.length === 0 ? true : errors;
}

export const signUpUser = async (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;
  let errors = [];

  try {
    // Check if passwords match
    if (password !== passwordConfirmation) {
      errors.push('Passwords do not match');
    }

    // Check if all fields are filled
    if (!username || !email || !password || !passwordConfirmation) {
      errors.push('Please fill in all fields');
    }

    // Check username length
    if (username.length < 5 || username.length > 20) {
      errors.push('Username must be between 5 and 20 characters');
    }

    // Check email length and format
    if (email.length < 5 || !email.includes('@')) {
      errors.push('Email must be atleast 5 characters and include an @ symbol');
    }

    // Validate the password before hashing
    const validationResult = checkPasswordValidity(password);

    if (validationResult !== true) {
      errors.push(...validationResult);
    }

    const userCount = await User.countDocuments({ email });

    if (userCount > 0) {
      errors.push('User already exists');
    }
    
    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(' & ') });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Generate and set the refreshToken
    const refreshTokenExpiresIn = req.body.keepLoggedIn ? '7d' : '1h';
    const refreshToken = await jsonwebtoken.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: refreshTokenExpiresIn }
    );

    // Set the refreshToken in the cookie
    res.cookie('refreshToken', refreshToken);

    return res.status(201).json({
      _id: user.id,
      email: user.email,
      username: user.username,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message
    });
  }
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
          }, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1h'});

        const refreshToken = jsonwebtoken.sign(
            {
              user: {
                username: user.username,
                email:user.email,
                id: user.id
              },
            }, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1h'});
          console.log("login made cookie", refreshToken )
        res.cookie('refreshToken', refreshToken)
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


export const deleteUser = async (req, res) => {
  console.log("deleting", req.params.id)
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    //remove cookie when deleting userno
    res.clearCookie("refreshToken")
    res.json(user);
  } catch (err) {
    console.log(err);
    res.json({
      message: err
    });
  }
}

export const refreshToken = async (req, res) => {
  //user this fetch for access token only for oauth2.0
  //res.cookie('accessToken', accessToken, {httpOnly: true})
  //second fetch for refresh token
  const {accessToken} = req.body;
  //let decoded = await jsonwebtoken.verify(accessToken, process.env.ACCESS_TOKEN_SECRET );

  jsonwebtoken.verify(accessToken, 
    process.env.ACCESS_TOKEN_SECRET, 
    function(err, decoded) {
      const {email, id, username} = decoded.user;

      console.log("???",email)
    try {
      
      User.findOne({email})
      .then(user => {
        if(user) {
          const refreshToken = jsonwebtoken.sign(
            {
              user: {
                username: username,
                email: email,
                id: id
              },
            }, process.env.ACCESS_TOKEN_SECRET);
          //add to mongo
          console.log("check",id, refreshToken)
          User.findByIdAndUpdate(id, {refreshToken: refreshToken}).then(()=>{
            console.log("cookie created", refreshToken)
            res.cookie('refreshToken', refreshToken)
            res.status(200).json({
              user: {
                username: username,
                email: email,
                id: id
              },
              login:true
            })
          });

        } else {
          res.status(401).json({ message: 'Cookie Error' });
        }
      })
      


    }catch(err){
      console.log(err);
      res.json({
        message: err
      });
  } //end of try catch

    
}); //end of refresh token


}//end of request



export const currentUser = async (req, res) => {
  //since the middleware was decrypting
  //we dont need to decrypt here
  res.json(req.user);
};

export const logout = async (req, res)  =>{
  console.log("logout");

  res.clearCookie("refreshToken");
  res.json({
    message: "logout"
  })

}