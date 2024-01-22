// rrd imports
import { useLoaderData, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

// library
import { toast } from "react-toastify";

import LoadingSpin from '../assets/loading-spin.svg' // Adjust the path to match your file structure

// components
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// helpers
import { createExpense, deleteItem } from "../helpers";

// loader
export async function budgetLoader({ params }) {



  const response = await fetch(`/api/budgets/${params.id}`);
  const budget = await response.json();



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
        budgetId: values.newExpenseBudget,
        category: values.newExpenseCategory,
        currency: values.newExpenseCurrency
      });

      console.log(values, "what values are here in budget page")

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

const BudgetPage = () => {
  const { budget } = useLoaderData();
  const [loading, setLoading] = useState(true);

  const {user, setUser} = useOutletContext();
  //remove localstorage.setItem('user') and navigate to login page
  //use this isntead setUser(.....)

  const [dots, setDots] = useState('.');


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Change this to the number of milliseconds you want

    return () => clearTimeout(timer); // This will clear the timer if the component unmounts before the timer finishes
  }, []);

  useEffect(() => {
    if (loading) {
      const dotsTimer = setInterval(() => {
        setDots((prevDots) => (prevDots.length >= 3 ? '.' : prevDots + '.'));
      }, 500); // Change this to the number of milliseconds you want

      return () => clearInterval(dotsTimer); // This will clear the timer if the component unmounts before the timer finishes
    }
  }, [loading]);

  if (loading || !budget) {
    return <div
      className="grid-lg"
      style={{
        color: "hsl(var(--accent))",
        fontWeight: "bold",
        fontSize: "clamp(1.94rem, calc(1.56rem + 1.92vw), 2.93rem)",
        display: "flex",
        alignItems: "center"
      }}
    >
      <img src={LoadingSpin} alt="Loading" width="40px" />
      Loading{dots}
    </div>;
  }

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
      {budget.expenses && budget.expenses.length > 0 ? (
      <div className="grid-md">
        <h2>
          <span className="accent">{budget.name}</span> Expenses
        </h2>
        <Table expenses={budget.expenses} showBudget={false} />
      </div>
      ) : (
        <div
          className="grid-lg"
          style={{
            color: "hsl(var(--accent))",
            fontWeight: "bold",
            fontSize: "clamp(1.94rem, calc(1.56rem + 1.92vw), 2.93rem)"
          }}
        >
          <p>{budget.name} has no expenses</p>
        </div>
      )}
    </div>
  );
};
export default BudgetPage;