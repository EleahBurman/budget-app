import { useState } from "react";
import ExpenseItem from "../components/ExpenseItem";

const Table = ({ expenses, showBudget = true, sortOrder, onSortChange }) => {
  const handleSortChange = (e) => {
    const newSortOrder = e.target.value;
    onSortChange(newSortOrder);
  };

   // Sort expenses based on the selected order
  const sortedExpenses = [...expenses].sort((a, b) => {
    const dateA = new Date(a.createdAt).toLocaleDateString();
    const dateB = new Date(b.createdAt).toLocaleDateString();

    if (sortOrder === "newest") {
      return dateB.localeCompare(dateA);
    } else {
      return dateA.localeCompare(dateB);
    }
  });

  console.log("Sorted Expenses:", sortedExpenses);

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {["Name", "Amount (USD)", "Date", showBudget ? "Budget" : "", ""].map((i, index) => (
              <th key={index}>
                {i === "Date" ? (
                  <div>
                    {i}
                    <select value={sortOrder} onChange={handleSortChange}>
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                    </select>
                  </div>
                ) : (
                  i
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map((expense) => (
            <tr key={expense._id}>
              <ExpenseItem expense={expense} showBudget={showBudget} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
