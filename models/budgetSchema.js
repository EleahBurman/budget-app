import mongoose from "mongoose";

let Schema = mongoose.Schema;

let budgetSchema = new Schema({
  //have user ids tied to all budgets --- work on get and create budgets
  user_id: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    }
  ],
  name: String,
  amount:  Number,
  expenses: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'Expense' 
    }
  ],
  color: String
  //add reference to user as an author
}, {
  timestamps: true
})

// budgetSchema.pre("save", (next)=>{
//   var budget = this;

//   if(budget.isModified('amount')){
//     //convert here

//     budget.amount = (Math.round(budget.amount * 100) / 100).toFixed(2);

  // }


// })


let Budget = mongoose.model('Budget', budgetSchema);

export {Budget};