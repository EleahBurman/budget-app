import express from 'express'
import { User } from '../models/index.js';

const userRouter = express.Router();

userRouter
  .route("/")
  .get(async (req, res)=>{
    const user = await User.findAll();
    res.json(user);
  })
  .post( async (req, res)=>{
    console.log('This is our body', req.body)
    const {name} = req.body
    try{

        const result = await User.create({
          name
        })
        res.json(result)

    } catch (err){
      console.log(err);
      res.json({
          message: err
      })
    }
  })

  export default userRouter