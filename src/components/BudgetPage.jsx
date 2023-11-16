// rrd imports
import { useLoaderData, useParams } from "react-router-dom";

// library
import { toast } from "react-toastify";
import { useState } from "react";
// components
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// helpers
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

// loader
export async function budgetLoader({ params }) {



  const response = await fetch(`/api/budgets/${params.id}`);
  const budget = await response.json();

  console.log("calling loader", budget);
  // const budget = await getAllMatchingItems({
  //   category: "budgets",
  //   key: "_id",
  //   value: params._id,
  // })[0];

  // const expenses = await getAllMatchingItems({
  //   category: "expenses",
  //   key: "category._id",
  //   value: params._id,
  // });

  if (!budget) {
    throw new Error("The budget you’re trying to find doesn’t exist");
  }

  return { budget };
}

// action
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      await createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget
      });

    

      return toast.success(`Expense ${values.newExpense} created!`);
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

const BudgetPage = () => {
  const { budget} = useLoaderData();
  //const [myBudget, setMyBudget] = useState(budget);
  console.log("info", budget.expenses);


  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true}/>
        <AddExpenseForm budgets={[budget]} />
      </div>
      {budget.expenses && budget.expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={budget.expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};
export default BudgetPage;