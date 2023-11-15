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
    return {_id: 222, name: "Eleah"}
  }
  // Handle other cases or return a default value
};

export const createUser = async (obj) =>{
  
  const response = await fetch("/api/users", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
     body: JSON.stringify(obj), // body data type must match "Content-Type" header
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
  if (id) {
    try {
      const response = await fetch(`/api/${key}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // The item was successfully deleted on the server
        // You can handle any additional logic here
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
export const createBudget = async ({ name, amount, }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
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
export const createExpense = async ({
  name, amount, budgetId
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
    category: budgetId
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
  // console.log(expenses, 'is fetch working')

  const budgetSpent = expenses.reduce((acc, expense)=> {
    console.log(budgetId, 'is this giving anything')
    console.log(expense.category._id, "as this")
    //check if expense.id === budgetId
    if(expense.category._id !== budgetId){
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