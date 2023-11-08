//react imports
import { useEffect, useState, useRef } from "react"

//rrd imports
import { useFetcher } from "react-router-dom"

//library imports
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import { set } from "mongoose"

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef()
  const focusRef = useRef()
  const [category, setCategory] = useState("")

  useEffect(()=>{
    if(!isSubmitting){
      //clear form
      formRef.current.reset()
      //reset focus
      focusRef.current.focus()
    }

  }, [isSubmitting])

  const setCategoryName=(evt)=>{
    const options = Array.from(evt.target.children)
    console.log("THIS IS WHAT WE WANT TO SEEEEE!!!", options)
    console.log("INNER TEXT", options[0].innerText, evt.target.value)
    console.log(options.find((option)=>{return option.value===evt.target.value}))
    //use find that selected variable
    //isolate selected.innerText or innerHTML
    //save that in state
  }
  
  return (
    <div className="form-wrapper">
      <h2 className="h3">Add New <span className="accent">
          {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
        </span>{" "}
          Expense
      </h2>
      <fetcher.Form 
        method="post"
        className="grid-sm"
        ref={formRef}
      >
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">
              Expense Name
            </label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.x. Coffee"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label 
              htmlFor="newExpenseAmount"
            >
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="E.x. 25.00"
              required
            />
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label 
            htmlFor="newExpenseCategory" 
            type="hidden"
          />
          <input 
            type="hidden"
            name="newExpenseCategory"
            value={category}
            id="newExpenseCategory"
          />
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select
            name="newExpenseBudget"
            id="newExpenseBudget"
            onChange={setCategoryName}
            required
          >{
            budgets
              .sort((a,b) => a.createdAt - b.createdAt)
              .map((budget) =>{
                return(
                  <option 
                    key={budget._id} 
                    value={budget._id}
                    
                  >
                    {budget.name}
                  </option>
                )
              })
          }</select>
        </div>
        <input 
          type="hidden" 
          name="_action"
          value="createExpense"
        />
        <button
          type="submit"
          className="btn btn--dark"
          disabled={isSubmitting}
        >
          {
            isSubmitting ?
            <span>Submitting...</span>:
            (
              <>
                <span>Add Expense</span>
                <PlusCircleIcon width={20} />
              </>
            )
          }
        </button>
      </fetcher.Form>
    </div>
  )
}

export default AddExpenseForm