import { useState } from 'react';
import ExpenseItem from './ExpenseItem';

const Table = ({ expenses, showBudget = true }) => {
  const [nameSortOrder, setNameSortOrder] = useState(''); // 'asc' for ascending, 'desc' for descending
  const [budgetNameSortOrder, setBudgetNameSortOrder] = useState(''); // 'asc' for ascending, 'desc' for descending
  const [amountSortOrder, setAmountSortOrder] = useState(''); // 'asc' for ascending, 'desc' for descending
  const [dateSortOrder, setDateSortOrder] = useState(''); // 'asc' for ascending, 'desc' for descending

  const sortExpenses = (expenses) => {
    return [...expenses].sort((a, b) => {
      if (nameSortOrder !== '') {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return nameSortOrder === 'asc' ? -1 : 1;
        }
        if (nameA > nameB) {
          return nameSortOrder === 'asc' ? 1 : -1;
        }
      } else if(budgetNameSortOrder !== ''){
        const nameA = a.category.toUpperCase(); // ignore upper and lowercase
        const nameB = b.category.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return budgetNameSortOrder === 'asc' ? -1 : 1;
        }
        if (nameA > nameB) {
          return budgetNameSortOrder === 'asc' ? 1 : -1;
        }
      }else if (amountSortOrder !== '') {
        const amountA = a.amount;
        const amountB = b.amount;
        return amountSortOrder === 'asc' ? amountA - amountB : amountB - amountA;
      } else if (dateSortOrder !== '') {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });
  };

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {
              ["Name", "Amount (USD)", "Date", showBudget ? "Budget": "", ""].map((i, index) =>(
                <th key={index}>
                  {i}
                  {i === 'Name' && (
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <select 
                        onChange={(e) => { setNameSortOrder(e.target.value); setBudgetNameSortOrder(''); setAmountSortOrder(''); setDateSortOrder(''); }}
                        style={{ textAlign: 'center', textAlignLast: 'center', width: '200px' }}
                      >
                        <option value="">---</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                      </select>
                    </div>
                  )}
                  {i === 'Amount (USD)' && (
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <select 
                        onChange={(e) => { setAmountSortOrder(e.target.value); setBudgetNameSortOrder(''); setNameSortOrder(''); setDateSortOrder(''); }}
                        style={{ textAlign: 'center', textAlignLast: 'center', width: '200px' }}
                      >
                        <option value="">---</option>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                      </select>
                    </div>
                  )}
                  {i === 'Date' && (
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <select 
                        onChange={(e) => { setDateSortOrder(e.target.value); setBudgetNameSortOrder(''); setNameSortOrder(''); setAmountSortOrder(''); }}
                        style={{ textAlign: 'center', textAlignLast: 'center', width: '200px' }}
                      >
                        <option value="">---</option>
                        <option value="asc">Old to New</option>
                        <option value="desc">New to Old</option>
                      </select>
                    </div>
                  )}
                  {i === 'Budget' && (
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <select 
                        onChange={(e) => { setNameSortOrder(''); setBudgetNameSortOrder(e.target.value); setAmountSortOrder(''); setDateSortOrder(''); }}
                        style={{ textAlign: 'center', textAlignLast: 'center', width: '200px' }}
                      >
                        <option value="">---</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                      </select>
                    </div>
                  )}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            sortExpenses(expenses).map((expense)=>(
              <tr key={expense._id}>
                <ExpenseItem expense={expense}  showBudget={showBudget} />
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;