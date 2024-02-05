import { Expense, Budget } from '../models/index.js';

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find().populate({
    path: 'category',
    model: 'Budget'
  });
  res.json(expenses);
};

//make sure to record currency
export const createExpense = async (req, res) => {
  const {name, amount, budgetId, currency} = req.body;
  try {
    const expense = await Expense.create({
      name,
      amount, //from amount
      category: budgetId,
      currency
    });

    Budget.findByIdAndUpdate(budgetId, {
      $push: { expenses: expense._id },
    }, { new:true })
    .then ((response) =>{
      res.json(response);
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

export const getExpenseById = async (req, res) => {
  const expenseId = req.params.expenseId;
  Expense.findById(expenseId).populate({
    path: 'category',
    model: 'Budget'
  })
  .then( (expense) => {
    res.json(expense);
  });
};

export const deleteExpense = async (req, res) => {
  const expenseId = req.params.expenseId;
  Expense.deleteOne({_id:expenseId})
  .then( () => {
    res.end();
  });
};