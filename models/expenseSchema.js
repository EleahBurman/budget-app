import mongoose from "mongoose";
let Schema = mongoose.Schema;

let expenseSchema = new Schema({
  name: String,
  amount:  Number,
  currency: {
    type: String
  },
  category:
    { 
      type: Schema.Types.ObjectId, 
      ref: 'Budget',
      required: true
    },
}, {
  timestamps: true
})

let Expense = mongoose.model('Expense', expenseSchema);

export {Expense};