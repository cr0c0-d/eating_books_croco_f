import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchBooks from "./components/SearchBooks";
import Layout from "./Layout";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "/search", element: <SearchBooks /> }],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
