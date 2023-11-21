import { Budget, Expense } from '../models/index.js';

export const getBudgets = async (req, res) => {
  const budgets = await Budget.find().populate({
    path: 'expenses',
    model: 'Expense'
  });
  res.json(budgets);
};

export const createBudget = async (req, res) => {
  const {name, amount, color} = req.body;
  try {
    const result = await Budget.create({ name, amount, color });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

export const getBudgetById = async (req, res) => {
  const budgetId = req.params.budgetId;
  const budget = await Budget.findById(budgetId).populate({
    path: 'expenses',
    model: 'Expense'
  });
  res.json(budget);
};

export const deleteBudget = async (req, res) => {
  const budgetId = req.params.budgetId;
  const associatedExpenses = await Budget.findById(budgetId).populate('expenses');
  console.log(associatedExpenses, "this is associated expenses");
  if(associatedExpenses.expenses.length > 1){
    let deletedExpenses = await Expense.deleteMany({ _id: { $in: associatedExpenses.expenses } });
    console.log(deletedExpenses, "this is deleted expenses");
  } else if(associatedExpenses.expenses.length === 1){
    let deletedExpenses = await Expense.deleteOne({ _id: { $in: associatedExpenses.expenses } });
    console.log(deletedExpenses, "this is deleted expenses when one expense is left");
  } else {
    console.log("no expenses to delete");
  }
  console.log("are we deleting anything in here", budgetId);
  Budget.deleteOne({_id:budgetId})
  .then( (response) => {
    console.log(response, "whats the response");
    res.end();
  })
  .catch((err) => {
    console.log(err);
  });
};