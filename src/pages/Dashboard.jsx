//rrd imports
import { Link, useLoaderData } from "react-router-dom";

//library
import { toast } from "react-toastify";

//helper functions
import { createBudget, createExpense, deleteItem, fetchData, waait } from "../helpers"

//components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
//helpers
import { createUser } from "../helpers";

//loaders
export async function dashboardLoader(){
  const userName = await fetchData("userName");
  const budgets = await fetchData("budgets");
  const expenses = await fetchData("expenses")
  return { userName, budgets, expenses }
}

//actions
export async function dashboardAction({request}){
  await waait()
  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data);
  //new user submission
  if(_action === "newUser"){
    try{

      const response = await createUser({
        name: values.userName});

      

      return toast.success(`Welcome, ${response.name}`)
    }catch(e){
      throw new Error("There was a problem creating your account.")
    }
  }
  if(_action === "createBudget"){
    try{
      //create budget
      await createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      })
      return toast.success("Budget created!")
    } catch(e){
      throw new Error("There was a problem creating your budget.")
    }
  }
  if(_action === "createExpense"){
    try{
      //create an expense
      await createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
        category: values.newExpenseCategory
      })
      return toast.success(`Expense ${values.newExpense} created!`)
    } catch(e){
      throw new Error("There was a problem creating your expense.")
    }
  }
  if(_action === "deleteExpense"){
    try{
      //create an expense
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      })
      return toast.success("Expense deleted!")
    } catch(e){
      throw new Error("There was a problem deleting your expense.")
    }
  }
  

}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData()
  console.log("???", userName, budgets, expenses);
  return (
    <div>
      {userName ? (
        <div className="dashboard">
          <h1>Welcome back, <span className="accent">{userName.name}</span>
          </h1>
          <div className="grid-sm">
          </div>
          { 
            budgets && budgets.length > 0
            ? (
            <div className="grid-lg">
            <div className="flex-lg">
              <AddBudgetForm />
              <AddExpenseForm budgets={budgets} />
            </div>
            <h2>Existing Budgets</h2>
            <div className="budgets">
              {
                budgets.map((budget) => {
           
                  
                  return <BudgetItem key={budget._id} budget={budget} />
                
                })
              }
            </div>
            {expenses && expenses.length > 0 && (
              <div className="grid-md">
                <h2>Recent Expenses</h2>
                <Table 
                  expenses={expenses
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .slice(0, 8)
                  } 
                />
                {expenses.length > 8 &&(
                  <Link
                    to="expenses"
                    className="btn btn--dark"
                  >
                  View all expenses
                  </Link>
                )}
              </div>
            )}
            </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedman.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )
          }
        </div>
      ): <Intro />}
    </div>
  )
}

export default Dashboard