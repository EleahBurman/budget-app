import express from 'express'
import { Budget, Expense } from '../models/index.js';

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
      const associatedExpenses = await Budget.findById(budgetId).populate('expenses')
      console.log(associatedExpenses, "this is associated expenses")
      if(associatedExpenses.expenses.length > 1){
        let deletedExpenses = await Expense.deleteMany({ _id: { $in: associatedExpenses.expenses } })
        console.log(deletedExpenses, "this is deleted expenses")
      }else if(associatedExpenses.expenses.length === 1){
        let deletedExpenses = await Expense.deleteOne({ _id: { $in: associatedExpenses.expenses } })
        console.log(deletedExpenses, "this is deleted expenses when one expense is left")
      } else{
        console.log("no expenses to delete")
      }
      console.log("are we deleting anything in here", budgetId)
      Budget.deleteOne({_id:budgetId})
      .then( (response) => {
        console.log(response, "whats the response")
        res.end()
      })
      .catch((err) => {
        console.log(err);
      })

    })

export default budgetRouter
