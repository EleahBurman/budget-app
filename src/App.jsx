import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//Routes
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import Main, { mainLoader } from "./layouts/Main";

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
          errorElement: <Error />
        },
      ]
    },
  ]);

  return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
  )
}

export default App
