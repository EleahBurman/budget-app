import express from 'express'

//controller functions
import{ registerUser, loginUser, currentUser } from '../controllers/userControllers.js'

const userRouter = express.Router();

// userRouter.route("/")
//   .get(async (req, res)=>{
//     const user = await User.findAll();
//     res.json(user);
//   })

userRouter.route("/register")
  .post(registerUser)
  
userRouter.route("/login")
  .post(loginUser)

userRouter.route("/current")
  .get(currentUser)

  export default userRouter