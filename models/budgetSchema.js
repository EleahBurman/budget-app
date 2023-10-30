import mongoose from "mongoose";
let Schema = mongoose.Schema;

let expenseSchema = new Schema({
  name: String,
  amount:  {
    type: mongoose.Decimal128,
    get: (v) => new mongoose.Types.Decimal128((+v.toString()).toFixed(2)),
  },
  category: String,
})

let budgetSchema = new Schema({
  name: String,
  amount:  {
    type: mongoose.Decimal128,
    get: (v) => new mongoose.Types.Decimal128((+v.toString()).toFixed(2)),
  },
  expenses: [expenseSchema]
})

// budgetSchema.pre("save", (next)=>{
//   var budget = this;

//   if(budget.isModified('amount')){
//     //convert here
   
//     budget.amount = (Math.round(budget.amount * 100) / 100).toFixed(2);

  // }


// })


let Budget = mongoose.model('budget',budgetSchema);

export {Budget};