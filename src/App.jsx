import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//Library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import Main, { mainLoader } from "./layouts/Main";

//Actions
import { logoutAction } from "./actions/logout";
import { deleteBudget } from "./actions/deleteBudget";
import { deleteUser } from "./actions/deleteUser";

//Components
import ExpensesPage, { expensesAction } from "./components/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./components/BudgetPage";
import SignUpPage, { signupAction } from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";

function App() {
  const router = createBrowserRouter([

    {
      path: "/",
      element: <Main />,
      loader: mainLoader,
      errorElement: <Error />,
      children:[
        { 
          //login page
          path: "users/login",
          element: <LoginPage />,
          // loader: loginLoader,
          action: deleteUser,
          errorElement: <Error />,
        },  
        { 
          //signup page
          path: "users/signup",
          element: <SignUpPage />,
          // loader: signupLoader,
          action: signupAction,
          errorElement: <Error />,
        },
  
        {
          index: true,
          path: "/",
          element: <Dashboard />,
          loader: dashboardLoader,
          action: dashboardAction,
          errorElement: <Error />,
        },
        
        {
          path: "budget/:id",
          element: <BudgetPage />,
          loader: budgetLoader,
          action: budgetAction,
          errorElement: <Error />,
          children : [
            {
              path: "delete",
              action: deleteBudget,
              errorElement: <Error />,
            },
            {
              path: "expenses",
              element: <ExpensesPage />,
              action: expensesAction,
              errorElement: <Error />,
    
            },
          ]
        },
        
        {
          path: "logout",
          action: logoutAction,
        }
      ]
    },


    
  ]);

  return (
      <div className="App">
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
  )
}

export default App
