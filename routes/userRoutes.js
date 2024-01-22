import express from 'express'

//controller functions
import{ signUpUser, loginUser, currentUser, deleteUser, refreshToken, logout, getUsers } from '../controllers/userControllers.js'

import {decodeCookie} from "../middleware/decodeCookie.js";
//middleware
// import { validateTokenHandler } from '../middleware/validateTokenHandler.js';

const userRouter = express.Router();

// userRouter.route("/")
//   .get(async (req, res)=>{
//     const user = await User.findAll();
//     res.json(user);
//   })

userRouter.route("/")
  .get(getUsers)
  
userRouter.route("/signup")
  .post(signUpUser)
  
userRouter.route("/login")
  .post(loginUser)

userRouter.route("/refreshtoken")
  .post(refreshToken)


userRouter.route("/current")
    .get(decodeCookie, currentUser)



userRouter.route("/:id")
  .delete(deleteUser)

userRouter.route("/logout")
    .get( logout )

  export default userRouter