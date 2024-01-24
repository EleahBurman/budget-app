//library
import { toast } from "react-toastify";

export const waait = () => new Promise(res => setTimeout(res, Math.random() * 800))

const usedColors = new Set();

const generateRandomColor = () => {
  let hue;
  do {
    hue = Math.floor(Math.random() * 36) * 10;
  } while (usedColors.has(hue));
  usedColors.add(hue);
  return `${hue}, 65%, 50%`;
}

// Local storage functions
export const fetchData = async (key) => {
  if (key === "budgets") {
    try {
      const response = await fetch("/api/budgets");

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error fetching data:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else if (key === "expenses") {
    try {
      const response = await fetch("/api/expenses");
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error fetching data:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  } else if (key === "userName") {
    //figure out this route and why it is not working 
    //const response = await fetch(`/api/users/${name}`)
    //const data = await response.json();
    //The route should give data that looks like this
    // return {_id: 222, name: "Eleah"}
    // if(!localStorage.getItem("accessToken")){
    //   return;
    // }

    console.log("getting current user")
    try {
        const response = await fetch("/api/users/current");
      if (response.ok) {
        const data = await response.json();
        return {
          _id: data.id,
          name: data.username,
          email: data.email,
        }
      } else {
        console.error("Error fetching data:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
};

export const createUser = async (obj) =>{
  
  const response = await fetch("/api/users/signup", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  });
  const data = await response.json();
  return data;
} 


//get all items from local storage
export const getAllMatchingItems = async ({category, key, value}) =>{
  const data = await fetchData(category) ?? [];

  return data.filter((item) => item[key] === value)
}

//delete item
export const deleteItem = async ({ key, id }) => {
  console.log("key: ", key)
  console.log("id: ", id)
  if (id) {
    try {
      const response = await fetch(`/api/${key}/${id}`, {
        method: "DELETE",
      });

      console.log(response, "are we reaching the delete")

      if (response.ok) {
        return true;
      } else {
        console.error(`Error deleting item (${key}) with ID ${id}:`, response.status);
        return false;
      }
    } catch (error) {
      console.error(`Error deleting item (${key}) with ID ${id}:`, error);
      return false;
    }
  }
  return false;
};

//create budget
export const createBudget = async ({ name, amount, currency}) => {
  
  let convertedAmount = false;
  if(currency != "USD"){
    const response = await fetch("/api/currency", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
        amount,
        fromCurrency: currency,
        toCurrency: "USD",
       }), // body data type must match "Content-Type" header
    });

    const data = await response.json();
  

    convertedAmount = parseFloat(data.result).toFixed(2); 
    console.log(convertedAmount, "did we get a converted amount")

  }
  
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: amount,
    currency: currency,
    color: await generateRandomColor()
  }

  try {
    const response = await fetch("/api/budgets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      return response.json();
    } else {
      console.error("Error creating budget:", response.status);
    }
  } catch (error) {
    console.error("Error creating budget:", error);
  }
}

//create expense
export const createExpense = async (props) => {
  console.log("props",props);
  const {
    name, amount, budgetId, currency
  } = props;

  let convertedAmount = false;
  if(currency != "USD"){
    const response = await fetch("/api/currency", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
        amount,
        fromCurrency: currency,
        toCurrency: "USD",
       }), // body data type must match "Content-Type" header
    });

    const data = await response.json();
  

    convertedAmount = parseFloat(data.result).toFixed(2); 
    console.log(convertedAmount, "did we get a converted amount")

  }





  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: convertedAmount ? convertedAmount : amount,
    budgetId: budgetId,
    category: budgetId,
    currency: currency
  }

  console.log("check new item amount",newItem.amount);
  // Calculate the total spent so far
  console.log(budgetId, "this is budget id")
  const budgets = await fetchData("budgets") ?? [];
  //this needs to be fixed tomorrow
  const budget = budgets.find((budget) => budget._id === budgetId);
  const totalBudget = budget.amount;
  // Check if the new expense would exceed the total spent
  if (+amount > totalBudget) {
    toast.error("Expense exceeds total spent. Try a smaller amount.")
    throw new Error("Above your total spent");
  }

  try {
    const response = await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem), // Include all properties
    });

    if (response.ok) {
      return response.json();
    } else {
      console.error("Error creating budget:", response.status);
    }
  } catch (error) {
    console.error("Error creating budget:", error);
  }
}

//total spend by budget
export const calculateSpentByBudget = async (budgetId) => {
  const expenses = await fetchData("expenses") ?? [];

  const budgetSpent = expenses.reduce((acc, expense)=> {
    const expenseBudgetId = expense.category._id
    if(expenseBudgetId !== budgetId){
      return acc
    }
    //add the current amount to my total
    return acc += expense.amount

  }, 0)
  return budgetSpent;
}

//formatting
export const formatDateToLocaleString = (epoch) => {
  return new Date(epoch).toLocaleDateString();
}


//formatting percentages
export const formatPercentages = (amt) => {
  return amt.toLocaleString(undefined,{
    style: "percent",
    miminumFractionDigits: 0,
  })
}

//formatting currency
export const formatCurrency = (amt) => {
  if (amt === undefined) {
    return '';
  }

  return amt.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};