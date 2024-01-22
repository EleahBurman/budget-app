//library imports
import { toast } from "react-toastify";

//helper improts
import { deleteItem } from "../helpers"

//rrd imports
import { redirect } from "react-router-dom";

export async function deleteUser({params, user}){
  console.log(params, "whats our userparams")
  try{
    await deleteItem({
      key: "users",
      id: params.id,
    });
    toast.success("User deleted successfully")
    return redirect("/")

  } catch(e){
    throw new Error ("There was a problem deleting your user")
  }

}