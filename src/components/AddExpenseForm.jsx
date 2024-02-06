//react imports
import { useEffect, useState, useRef } from "react"

//rrd imports
import { useFetcher } from "react-router-dom"

//library imports
import { PlusCircleIcon } from "@heroicons/react/24/solid"




const AddExpenseForm = ({ budgets }) => {
  //const {currencyList} = useLoaderData();
  const [currencyList, setCurrencyList] = useState([]);
  const [selectCurrency, setSelectCurrency] = useState("USD");


  //use use effect or loader to get currency list into expense form - make sure it trickles down as far as props are concerned
  const getCurrencyList = async () => {
    const result = await fetch('/api/currency');
    const data = await result.json();
    console.log(data);
    setCurrencyList(data.currencies
      );
  }

  useEffect(()=>{
      getCurrencyList();


  },[])

  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef()
  const focusRef = useRef()
  //this grabs the first category
  const [category, setCategory] = useState(budgets[0].name);

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
    const selectedOption = options.find((option)=>{return option.value===evt.target.value})
    setCategory(selectedOption.innerText)
  }

  return (
    <div className="form-wrapper">
      <h2 className="h3">Add New <span className="accent">
          {category}
        </span>{" "}
          Expense
      </h2>
      <fetcher.Form 
        method="post"
        className="grid-sm"
        ref={formRef}
      >
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
          <label 
            htmlFor="newExpenseBudget"
          >Budget Category
          </label>
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
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">
              Expense Name
            </label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="Coffee"
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
              placeholder="25"
              required
            />
          </div>
        </div>
        <div className="grid-xs">

        <label htmlFor="newExpenseCurrency">Currency</label>
          <select 
            name="newExpenseCurrency" 
            id="newExpenseCurrency" 
            value={selectCurrency} 
            onChange={(e)=>setSelectCurrency(e.target.value)}
          >
            {
              Object.entries(currencyList).map((c,k) => <option key={k} value={c[0]}>{c[1]} ({c[0]})</option>)
            }
            
          </select>
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