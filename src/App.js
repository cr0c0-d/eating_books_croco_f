import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchBooks from "./components/book/SearchBooks";
import SignUpForm from "./components/member/SignUpForm";
import Login from "./components/member/Login";
import Layout from "./Layout";
import WriteArticle from "./components/article/WriteArticle";
import Article from "./components/article/Article";
import ArticleList from "./components/article/ArticleList";
import Member from "./components/member/Member";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/search", element: <SearchBooks /> },
        { path: "/signup", element: <SignUpForm /> },
        { path: "/login", element: <Login /> },
        { path: "/writeArticle", element: <WriteArticle /> },
        { path: "/articles", element: <ArticleList /> },
        { path: "/articles/*", element: <Article /> },
        { path: "/members/*", element: <Member /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
