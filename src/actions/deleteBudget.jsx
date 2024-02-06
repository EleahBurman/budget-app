//library imports
import { toast } from "react-toastify";

//helper improts
import { deleteItem } from "../helpers"

//rrd imports
import { redirect } from "react-router-dom";

export async function deleteBudget({params, budget}){
  console.log(params, "whats our params")
  try{
    const deletedBudget = await deleteItem({
      key: "budgets",
      id: params.id,
    });
    if (deletedBudget) {
      toast.success(`${deletedBudget.name} deleted successfully`)
    } else {
      throw new Error();
    }
    return redirect("/")
  } catch(e){
    throw new Error ("There was a problem deleting your budget")
  }
}