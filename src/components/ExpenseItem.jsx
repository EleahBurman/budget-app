//rrd imports
import { Link, useFetcher } from "react-router-dom";

//library import
import { TrashIcon } from "@heroicons/react/24/solid";

//helper imports
import { 
  formatCurrency, 
  formatDateToLocaleString, getAllMatchingItems } from "../helpers";
import { useState, useEffect } from "react";


const ExpenseItem = ({ expense, showBudget }) => {
  const fetcher = useFetcher()
  const [budget, setBudget] = useState([])

  useEffect(() => {
    if(expense && expense.category){
    const getBudget = async () => {
      const responses = await getAllMatchingItems({
        category: "budgets",
        key: "_id",
        value: expense.category,
      });

      if (responses && responses.length > 0) {
        const data = responses[0]
        setBudget(data);
      }
    };

    getBudget();
  }
  }, [expense, expense.category]);


  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {
        showBudget && (
        <td>
          <Link
          to={`/budget/${budget._id}`}
          style={{
            "--accent": budget.color,
          }}
          >
            {budget.name}
          </Link>
        </td>
        )

      }
      
      <td>
        <fetcher.Form
          method="post"
        >
          <input
            type="hidden"
            name="_action"
            value="deleteExpense"
          />
          <input
            type="hidden"
            name="expenseId"
            value={expense._id}
          />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20}/>
          </button>

        </fetcher.Form>
      </td>
    </>
  )
}

export default ExpenseItem