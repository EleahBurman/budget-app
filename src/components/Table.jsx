// Table.jsx
import { useState } from "react";
import ExpenseItem from "../components/ExpenseItem";

const Table = ({ expenses, showBudget = true }) => {
  const [sortOrder, setSortOrder] = useState("newest");

  const handleSortChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
  };

  // Sort expenses based on the selected order
  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortOrder === "newest" || sortOrder === "oldest") {
      // Sort by date
      const dateA = new Date(a.createdAt).toLocaleDateString();
      const dateB = new Date(b.createdAt).toLocaleDateString();

      if (sortOrder === "newest") {
        return dateB.localeCompare(dateA);
      } else {
        return dateA.localeCompare(dateB);
      }
    } else if (sortOrder === "az" || sortOrder === "za") {
      // Sort by name
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (sortOrder === "az") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
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
                {i === "Date" || i === "Name" ? (
                  <div>
                    {i}
                    <select value={sortOrder} onChange={handleSortChange}>
                      {i === "Date" && (
                        <>
                          <option value="newest">Newest</option>
                          <option value="oldest">Oldest</option>
                        </>
                      )}
                      {i === "Name" && (
                        <>
                          <option value="az">A-Z</option>
                          <option value="za">Z-A</option>
                        </>
                      )}
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
