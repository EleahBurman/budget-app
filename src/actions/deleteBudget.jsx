//library imports
import { toast } from "react-toastify";

//helper improts
import { deleteItem, getAllMatchingItems } from "../helpers"

//rrd imports
import { redirect } from "react-router-dom";

export function deleteBudget({params}){
  try{
    deleteItem({
      key:"budgets",
      id: params._id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params._id
    })

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense._id,
      })
    })
    toast.success("Budget deleted successfully")
  } catch(e){
    throw new Error ("There was a problem deleting your budget")
  }
  return redirect("/")
}