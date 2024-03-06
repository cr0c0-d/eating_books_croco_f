import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchBooks from "./components/SearchBooks";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SearchBooks />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
