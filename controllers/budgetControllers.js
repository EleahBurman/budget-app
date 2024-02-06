import { Budget, Expense } from '../models/index.js';


export const getBudgets = async (req, res) => {
  console.log("Getting Budgets");
  //use this as a reference for expenses
  console.log("decode cookie in budget:", req.user)
  console.log("end==========")
  //come back later --- best practices try catch for async await

  //this is because there is currently no req.user and it is breaking the code when running front end
  if(!req.user){
    res.json({
      message: "Not logged in"
    })
  }
  
  try{

    const budgets = await Budget.find({
      user_id: req.user.id
    }).populate({
      path: 'expenses',
      model: 'Expense'
    });
    console.log("get budget", budgets)
    res.json(  budgets);

  } catch (e){

    res.json({
      message:e
    })
  }


};

export const createBudget = async (req, res) => {
  console.log("Create Budgets");
  console.log("userdata", req.user) 
  //decoded cookie data is in here -- add decode cookie --- make sure no local host in any fetches -- redirects to signup page when I create a budget and its not receiving any budgets currently
  const {name, amount, color} = req.body;
  try {
    const result = await Budget.create({ user_id: req.user.id, name, amount, color });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

export const getBudgetById = async (req, res) => {
  console.log("Get budget by id")
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
  Budget.findByIdAndRemove(budgetId)
  .then( (deletedBudget) => {
    console.log(deletedBudget, "whats the deleted budget");
    res.json(deletedBudget);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('There was a problem deleting the budget.');
  });
};