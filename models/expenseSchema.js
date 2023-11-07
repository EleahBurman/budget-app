import mongoose from "mongoose";
let Schema = mongoose.Schema;

let expenseSchema = new Schema({
  name: String,
  amount:  Number,
  category: String
}, {
  timestamps: true
})

let Expense = mongoose.model('Expense', expenseSchema);

export {Expense};