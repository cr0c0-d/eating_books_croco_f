import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SearchBooks from "./components/book/SearchBooks";
import SignUpForm from "./components/member/SignUpForm";
import Login from "./components/member/Login";
import Layout from "./Layout";
import WriteArticle from "./components/article/WriteArticle";
import Article from "./components/article/Article";
import Member from "./components/member/Member";
import LastArticleList from "./components/article/LastArticleList";
import ArticleListByIsbn from "./components/article/ArticleListByIsbn";
import MemberArticles from "./components/member/MemberArticles";
import Main from "./components/Main";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Main /> },
        { path: "/search", element: <SearchBooks /> },
        { path: "/signup", element: <SignUpForm /> },
        { path: "/login", element: <Login /> },
        { path: "/writeArticle", element: <WriteArticle /> },
        { path: "/articles", element: <LastArticleList /> },
        { path: "/articles/*", element: <Article /> },
        { path: "/members/*", element: <Member /> },
        { path: "/articles/book/*", element: <ArticleListByIsbn /> },
        { path: "/articles/member/*", element: <MemberArticles /> },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />{" "}
      <BrowserRouter basename="https://cr0c0-d.github.io/eating_books_croco_f/" />
    </div>
  );
}

export default App;
