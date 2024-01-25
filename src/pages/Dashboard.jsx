// Dashboard.jsx
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { createBudget, createExpense, deleteItem, fetchData, waait } from "../helpers";
import SignUpPage from "../components/SignUpPage";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import { createUser } from "../helpers";
import { useState } from "react";

export async function dashboardLoader() {
  const userName = await fetchData("userName");
  const budgets = await fetchData("budgets");
  const expenses = await fetchData("expenses");
  return { userName, budgets, expenses };
}

export async function dashboardAction({ request }) {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "newUser") {
    try {
      const response = await createUser({
        name: values.userName,
      });
      return toast.success(`Welcome, ${response.name}`);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createBudget") {
    try {
      await createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
        currency: values.newBudgetCurrency,
      });
      return toast.success("Budget created!");
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
    }
  }

  if (_action === "createExpense") {
    try {
      await createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
        category: values.newExpenseCategory,
        currency: values.newExpenseCurrency,
      });
      return toast.success(`Added ${values.newExpense} to budget!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets } = useLoaderData();
  const [sortOrder, setSortOrder] = useState("newest");

  const handleSortChange = (newSortOrder) => {
    console.log("New Sort Order:", newSortOrder);
    setSortOrder(newSortOrder);
  };

  const expenses = budgets.reduce((acc, cur) => {
    return [...acc, ...cur.expenses];
  }, []);

  return (
    <div>
      {userName?.name ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName.name}</span>
          </h1>
          <div className="grid-lg">
            <div className="flex-lg">
              <AddBudgetForm />
              <AddExpenseForm budgets={budgets} />
            </div>
            <h2>Existing Budgets</h2>
            <div className="budgets">
              {budgets.map((budget) => (
                <BudgetItem key={budget._id} budget={budget} />
              ))}
            </div>
            {expenses && expenses.length > 0 && (
              <div className="grid-md">
                <h2>Recent Expenses</h2>
                <Table expenses={expenses} sortOrder={sortOrder} onSortChange={handleSortChange} />
                {expenses.length > 8 && (
                  <Link to="expenses" className="btn btn--dark">
                    View all expenses
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <SignUpPage />
      )}
    </div>
  );
};

export default Dashboard;
