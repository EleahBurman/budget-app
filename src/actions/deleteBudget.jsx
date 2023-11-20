//library imports
import { toast } from "react-toastify";

//helper improts
import { deleteItem, getAllMatchingItems } from "../helpers"

//rrd imports
import { redirect } from "react-router-dom";

export async function deleteBudget({params, budget}){
  console.log(params, "whats our params")
  try{
    await deleteItem({
      key: "budgets",
      id: params.id,
    });
    toast.success("Budget deleted successfully")
    return redirect("/")
    // const associatedExpenses = await getAllMatchingItems({
    //   category: budget.expenses.category,
    //   key: budget.expenses._id,
    //   value: params.id
    // })

    // console.log(associatedExpenses, "are these the associated expenses?")

    // associatedExpenses.forEach(async (expense) => {
    //   await deleteItem({
    //     key: "expenses",
    //     id: expense._id,
    //   })
    // })

  } catch(e){
    throw new Error ("There was a problem deleting your budget")
  }

}