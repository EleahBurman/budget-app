//rrd imports
import { useLoaderData } from "react-router-dom"

//components
import Table from "../components/Table"

//helpers
import { deleteItem, fetchData, waait } from "../helpers"

//library import
import { toast } from "react-toastify"

//loaders
export async function expensesLoader(){
  const expenses = await fetchData("expenses")
  return { expenses }
}

//action
export async function expensesAction({request}){
  await waait()
  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data);
  if(_action === "deleteExpense"){
    try{
      //create an expense
      const deletedExpense = await deleteItem({
        key: "expenses",
        id: values.expenseId,
      })
      return toast.success(`${deletedExpense.name} deleted!`)
    } catch(e){
      throw new Error("There was a problem deleting your expense.")
    }
  }
}

const ExpensesPage = () => {
  const {expenses} = useLoaderData()
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {
        expenses && expenses.length > 0
        ? (
          <div className="grid-md">
            <h2>Recent Expenses <small>({expenses.length}) total</small></h2>
            <Table expenses={expenses}/>
          </div>
        )
        : 
        <div
          className="grid-lg"
          style={{
            color: "#1bbbc3",
            fontWeight: "bold",
            fontSize: "clamp(1.94rem, calc(1.56rem + 1.92vw), 2.93rem)"
          }}
        >
          <p>No expenses to show</p>
        </div>
      }
    </div>
  )
}

export default ExpensesPage