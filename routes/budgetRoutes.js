import express from 'express'
import { Budget } from '../models/index.js';

const budgetRouter = express.Router();

budgetRouter
  .route("/")
  .get(async (req, res)=>{
    const budgets = await Budget.find().populate({
      path: 'expenses',
      model: 'Expense'
  })
    res.json(budgets)
  })
  .post( async (req, res)=>{
    console.log('This is our body', req.body)
    const {name, amount, color} = req.body
    try{

        const result = await Budget.create({
          name,
          amount,
          color
        })
        res.json(result)

    } catch (err){
      console.log(err);
      res.json({
          message: err
      })
    }
  })
  budgetRouter.route("/:budgetId")
    .get(async (req, res)=>{
      const budgetId = req.params.budgetId;

      Budget.findById(budgetId).populate({
        path: 'expenses',
        model: 'Expense'
      })
      .then( (budget) => {
        res.json(budget)
      })

    })
    .delete(async (req, res)=>{
      const budgetId = req.params.budgetId;

      Budget.deleteOne({_id:budgetId})
      .then( () => {
        res.end()
      })

    })

export default budgetRouter
