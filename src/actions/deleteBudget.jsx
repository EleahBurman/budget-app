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

  } catch(e){
    throw new Error ("There was a problem deleting your budget")
  }

}