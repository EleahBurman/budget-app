import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//Routes
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      loader: dashboardLoader,
      errorElement: <Error />
    },
    {
      path: "*",
      element: <Error />
    },
  ]);

  return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
  )
}

export default App
