import express from 'express'
import { Expense } from '../models/index.js';

const expenseRouter =  express.Router();

expenseRouter
  .route("/expenses")
  .post( async (req, res)=>{
  console.log(req.body)
  const {name, amount} = req.body
  try{

      const result = await Expense.create({
        name,
        amount,
        category,
      })
      res.json(result)

  } catch (err){
    console.log(err);
    res.json({
        message: err
    })
  }
})

export { expenseRouter }
