import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from "../helpers";
import { useState, useEffect } from "react";

const ExpenseItem = ({ expense, showBudget, sortOrder }) => {
  const fetcher = useFetcher();
  const [budget, setBudget] = useState([]);

  useEffect(() => {
    const getBudget = async () => {
      if (expense && expense.category) {
        const responses = await getAllMatchingItems({
          category: "budgets",
          key: "_id",
          value: expense.category,
        });

        if (responses && responses.length > 0) {
          const data = responses[0];
          setBudget(data);
        }
      }
    };

    getBudget();
  }, [expense, expense.category]);

  // Render only if the budget data is available
  if (!budget || Object.keys(budget).length === 0) {
    return null;
  }

  // Simplified sorting logic for the "Budget" column using ternary operator
  const budgetName = budget.name
  let sortedBudget;
  
  if (sortOrder === "alpha") {
    // Use the sort function for alphabetical order
    sortedBudget = budgetName.split(' ').sort((a, b) => a.localeCompare(b)).join(' ');
  } else if (sortOrder === "anti_alpha") {
    // Use the sort function for reverse alphabetical order
    sortedBudget = budgetName.split(' ').sort((a, b) => b.localeCompare(a)).join(' ');
  } else {
    // Default to alphabetical order if sortOrder is not recognized
    sortedBudget = budgetName.split(' ').sort((a, b) => a.localeCompare(b)).join(' ');
  }

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link
            to={`/budget/${budget._id}`}
            style={{
              "--accent": budget.color,
            }}
          >
            {sortedBudget}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense._id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
