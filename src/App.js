import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchBooks from "./components/book/SearchBooks";
import SignUpForm from "./components/member/SignUpForm";
import Login from "./components/member/Login";
import Layout from "./Layout";
import NewArticle from "./components/article/NewArticle";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/search", element: <SearchBooks /> },
        { path: "/signup", element: <SignUpForm /> },
        { path: "/login", element: <Login /> },
        { path: "/newArticle", element: <NewArticle /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
