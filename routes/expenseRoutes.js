import express from 'express'
import { Expense } from '../models/index.js';
import { Budget } from '../models/index.js';

const expenseRouter = express.Router();

expenseRouter
  .route("/")
  .get(async (req, res)=>{
    const expenses = await Expense.find()
    res.json(expenses)
  })
  .post( async (req, res)=>{
    console.log('this is the expenses body', req.body)
    const {name, amount, category, budgetId} = req.body
    try{
        const expense = await Expense.create({
          name,
          amount,
          category
        })
        console.log(expense, 'expense')
        Budget.findByIdAndUpdate(budgetId, {
          $push: { expenses: expense._id },
        }, { new:true })
          .then ((response) =>{
          res.json(response)
          }
        )
  } catch (err){
    console.log(err);
    res.json({
        message: err
    })
  }

  })
  expenseRouter.route("/:expenseId")
  .delete(async (req, res)=>{
    const expenseId = req.params.expenseId;

    Expense.deleteOne({_id:expenseId})
    .then( () => {
      res.end()
    })

  })

  

export default expenseRouter
