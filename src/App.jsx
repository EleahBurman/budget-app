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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      loader: mainLoader,
      errorElement: <Error />,
      children:[
        {
          index: true,
          path: "/",
          element: <Dashboard />,
          loader: dashboardLoader,
          action: dashboardAction,
          errorElement: <Error />
        },
        {
          path: "logout",
          action: logoutAction
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
