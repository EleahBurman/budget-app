import express from 'express'
import { Budget } from '../models/budgetSchema';

const budgetRouter =  express().Router();


budgetRouter.post( async (req, res)=>{
  console.log(req.body)
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

export { budgetRouter }
