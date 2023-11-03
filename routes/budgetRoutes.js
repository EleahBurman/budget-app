import express from 'express'
import { Budget } from '../models/index.js';

const budgetRouter = express.Router();

budgetRouter
  .route("/")
  .get(async (req, res)=>{
    const budgets = await Budget.find()
    res.json(budgets)
  })
  .post( async (req, res)=>{
  console.log('This is our body', req.body)
  const {name, amount} = req.body
  try{

      const result = await Budget.create({
        name,
        amount,
      })
      res.json(result)

  } catch (err){
    console.log(err);
    res.json({
        message: err
    })
  }
})

export default budgetRouter
