import { Form } from "react-router-dom"

//library imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid"

const AddBudgetForm = () => {
  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Create Budget
      </h2>

      <Form
        method="post"
        className="grid-sm"
      >
        <div className="grid-xs">
          <label 
            htmlFor="newBudget"
          >
            Budget Name
          </label>
          <input 
            type="text" 
            name="newBudget" 
            id="newBudget"
            placeholder="e.x. Groceries"
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.x. $350"
            inputMode="decimal"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn--dark"
        >
          <span>Create Budget</span>
          <CurrencyDollarIcon width={20} />
        </button>
      </Form>
    </div>
  )
}

export default AddBudgetForm