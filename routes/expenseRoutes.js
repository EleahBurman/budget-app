import express from 'express'
import { Expense } from '../models/index.js';
import { Budget } from '../models/index.js';

const expenseRouter = express.Router();

expenseRouter
  .route("/")
  .get(async (req, res)=>{
    const expenses = await Expense.find().populate({
      path: 'category',
      model: 'Budget'
    })
    res.json(expenses)
  })
  .post( async (req, res)=>{
    console.log('this is the expenses body', req.body)
    const {name, amount, budgetId} = req.body
    try{
        const expense = await Expense.create({
          name,
          amount,
          category: budgetId
        })

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
    .get(async (req, res)=>{
      const expenseId = req.params.expenseId;

      Expense.findById(expenseId).populate({
        path: 'category',
        model: 'Budget'
      })
      .then( (expense) => {
        res.json(expense)
      })

    })
    .delete(async (req, res)=>{
      const expenseId = req.params.expenseId;

      Expense.deleteOne({_id:expenseId})
      .then( () => {
        res.end()
      })

    })

  

export default expenseRouter
