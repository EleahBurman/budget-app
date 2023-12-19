import express from 'express'

//controller functions
import{ signUpUser, loginUser, currentUser, deleteUser, refreshToken } from '../controllers/userControllers.js'

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

userRouter.route("/refreshtoken")
  .post(refreshToken)

userRouter.route("/current")
  .get( currentUser)

userRouter.route("/:id")
  .delete(deleteUser)

  export default userRouter