import mongoose from "mongoose";

let Schema = mongoose.Schema;

let budgetSchema = new Schema({
  name: String,
  amount:  Number,
  expenses: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'Expense' 
    }
  ],
  color: String
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