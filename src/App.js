import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchBooks from "./components/SearchBooks";
import SignUpForm from "./member/SignUpForm";
import Login from "./member/Login";
import Layout from "./Layout";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/search", element: <SearchBooks /> },
        { path: "/signup", element: <SignUpForm /> },
        { path: "/login", element: <Login /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
