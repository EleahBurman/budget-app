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

export const signUpUser =  async (req, res) => {
  console.log("This is req body: ", req.body);


  const {username, email, password, passwordConfirmation} = req.body;
  try {


    if (password !== passwordConfirmation) {
      res.status(400).json({message: 'Passwords do not match'});
    }

    if (!username || !email || !password || !passwordConfirmation) {
      res.status(400).json({message: 'Please fill in all fields'});
    }

    const userAvailable = await User.findOne({email});
    console.log("userAvailable", userAvailable)
    if (!userAvailable) {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hash success", hashedPassword);
      const user = await User.create({
        username,
        email,
        password: hashedPassword
      });
      console.log(`User created ${user}`);
      if (user) {
        const refreshToken = await jsonwebtoken.sign(
            {
              user: {
                username: user.username,
                email: user.email,
                id: user.id
              },
            }, process.env.ACCESS_TOKEN_SECRET, );

        res.cookie('refreshToken', refreshToken)

        console.log("sign up made cookie")
        res.status(201).json({
          _id: user.id,
          email: user.email,
          username: user.username,
          password: user.password,
          confirmationPassword: user.confirmationPassword,
        });
      } else {
        res.status(400).json({message: 'Invalid user data'});
      }

    } else {
      res.status(400).json({message: 'User already exists'});
    }


  } catch (err){
    console.log(err);
    res.status(500).json({
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
    //console.log("current user", req)
    try {
      console.log( "COOKIE", req.cookies['refreshToken']); //read cookie
    //decoded

    if(!req.cookies['refreshToken'] ){
      res.json({
        message: "Please login"
      })
      //throw Error("Cookie not valid");
    } else {
      await jsonwebtoken.verify( 
        req.cookies['refreshToken'],
        process.env.ACCESS_TOKEN_SECRET,
        function(err, decoded) {
          console.log("current user",err, "-------", decoded)
  
          if(err || decoded === undefined){
            //console.log(err, "Error with decoding cookie")
            res.json({err});
          } else {
            res.json(decoded.user);
          }
  
          
        }
      )
      

    }
    //i have the cookie, now i need to decode it 
    //retrieve the user id email, send that back
    //res.json(req.user);

  } catch(err) {
    console.log(err)
    res.status(401).json({
      message: err
    });
  }

};

export const logout = async (req, res)  =>{
  console.log("logout");

  res.clearCookie("refreshToken");
  res.json({
    message: "logout"
  })

}