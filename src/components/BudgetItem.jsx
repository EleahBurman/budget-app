//rrd imports
import {Form, Link} from "react-router-dom"

//component import
import ExpensePieChart from "../components/ExpensePieChart";

//library imports
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";

//helper functions
import { formatCurrency, formatPercentages } from "../helpers";

const BudgetItem = ({budget, expenses, showDelete, showChart}) => {
  const {_id, name, amount, totalSpent} = budget;


  return (
    <div 
      className="budget"
      style={{
        "--accent": budget.color
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{ formatCurrency(amount) } Budgeted</p>
      </div>
      <progress max={amount} value={totalSpent}>
        {formatPercentages(totalSpent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(totalSpent)} Total Spent</small>
        <small>{formatCurrency(amount - totalSpent)} Remaining</small>
      </div>
      {
        showDelete ? (
          <div className="flex-sm">
            <Form 
              method="post"
              action="delete"
              onSubmit={(event) => {
                if(!confirm("Are you sure you want to permanently delete this budget?"))
                  event.preventDefault();
              }}
            >
              <button
                type="submit"
                className="btn"
              >
                <span>Delete Budget</span>
                <TrashIcon width={20} />
              </button>
            </Form>
            <ExpensePieChart expenses={expenses} />
          </div>
        ) : (
          <div className="flex-sm">
            <Link
              to={`/budget/${_id}`}
              className="btn"
              >
              <span>View Details</span>
              <BanknotesIcon width={20} />
            </Link>
            {showChart && <ExpensePieChart expenses={expenses} />}
          </div>
        )
      }
    </div>
  )
}

export default BudgetItem