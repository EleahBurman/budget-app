import express from 'express'

//controller functions
import{ signUpUser, loginUser, currentUser } from '../controllers/userControllers.js'

//middleware
import { validateTokenHandler } from '../middleware/validateTokenHandler.js';

const userRouter = express.Router();

// userRouter.route("/")
//   .get(async (req, res)=>{
//     const user = await User.findAll();
//     res.json(user);
//   })

userRouter.route("/signup")
  .post(signUpUser)
  
userRouter.route("/login")
  .post(loginUser)

userRouter.route("/current")
  .get(validateTokenHandler, currentUser)

  export default userRouter