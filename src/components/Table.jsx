// Table.jsx
import { useState } from "react";
import ExpenseItem from "../components/ExpenseItem";

const Table = ({ expenses, showBudget = true }) => {
  const [sortOrder, setSortOrder] = useState("newest");

  const handleSortChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortOrder === "newest" || sortOrder === "oldest") {
      const dateA = new Date(a.createdAt).toLocaleDateString();
      const dateB = new Date(b.createdAt).toLocaleDateString();

      return sortOrder === "newest" ? dateB.localeCompare(dateA) : dateA.localeCompare(dateB);
    } else if (sortOrder === "az" || sortOrder === "za") {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      return sortOrder === "az" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    } else if (sortOrder === "low_high" || sortOrder === "high_low") {
      const amountA = a.amount;
      const amountB = b.amount;

      return sortOrder === "low_high" ? amountA - amountB : amountB - amountA;
    } 
  });

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {["Name", "Amount (USD)", "Date", showBudget ? "Budget" : "", ""].map((i, index) => (
              <th key={index}>
                {i === "Date" || i === "Name" || i === "Amount (USD)" || i === "Budget" ? (
                  <div>
                    {i}
                    <select className="centered-text" value={sortOrder} onChange={handleSortChange}>
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
                      {i === "Amount (USD)" && (
                        <>
                          <option value="low_high">Low to High</option>
                          <option value="high_low">High to Low</option>
                        </>
                      )}
                      {i === "Budget" && (
                        <>
                          <option value="alpha">A-Z</option>
                          <option value="anti_alpha">Z-A</option>
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
              <ExpenseItem expense={expense} showBudget={showBudget} sortOrder={sortOrder} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
