//react imports
import { useEffect, useState, useRef } from "react";

//rrd imports
import { useFetcher } from "react-router-dom"

//library imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid"


const AddBudgetForm = () => {
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
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting"

  const formRef = useRef()
  const focusRef = useRef()

  useEffect(() => {
    if(!isSubmitting){
      formRef.current.reset()
      focusRef.current.focus()
    }
  }, [isSubmitting])

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Create Budget
      </h2>

      <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
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
            placeholder="Groceries"
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="3000"
            inputMode="decimal"
            required
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetCurrency">Currency</label>
          <select 
            name="newBudgetCurrency" 
            id="newBudgetCurrency" 
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
          value="createBudget"
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
                <span>Create Budget</span>
                <CurrencyDollarIcon width={20} />
              </>
            )
          }
        </button>
      </fetcher.Form>
    </div>
  )
}

export default AddBudgetForm