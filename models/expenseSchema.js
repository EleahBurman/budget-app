import mongoose from "mongoose";
let Schema = mongoose.Schema;

let expenseSchema = new Schema({
  name: String,
  amount:  Number,
  currency: {
    type: String
  },
    fromCurrency: {
        type: String
    },
    fromAmount: {
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

expenseSchema.pre('save', async function(next) {
    let expense = this;
    console.log("pre save expense:", expense)
    const {name, amount, currency } = expense;
    //note currency is fromCurrency

    let convertedAmount = false;
    if(currency != "USD"){
        const response = await fetch(`http://api.exchangerate.host/convert?from=${currency}&to=usd&amount=${amount}&access_key=${process.env.EXCHANGE_RATE_KEY}`);


        const data = await response.json();

        console.log("?? data:", data)
        convertedAmount = parseFloat(data.result).toFixed(2);
        console.log(convertedAmount, "did we get a converted amount")

    }


        expense.currency = "USD";
        expense.amount =  convertedAmount ? convertedAmount : amount;
        expense.fromCurrency =   convertedAmount ? currency : "USD";
        expense.fromAmount =  amount;


    console.log("check expense:", expense)

    next();
});


let Expense = mongoose.model('Expense', expenseSchema);

export {Expense};