import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
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
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Layout />,
  //     children: [
  //       { path: "/", element: <Main /> },
  //       { path: "/search", element: <SearchBooks /> },
  //       { path: "/signup", element: <SignUpForm /> },
  //       { path: "/login", element: <Login /> },
  //       { path: "/writeArticle", element: <WriteArticle /> },
  //       { path: "/articles", element: <LastArticleList /> },
  //       { path: "/articles/*", element: <Article /> },
  //       { path: "/members/*", element: <Member /> },
  //       { path: "/articles/book/*", element: <ArticleListByIsbn /> },
  //       { path: "/articles/member/*", element: <MemberArticles /> },
  //     ],
  //   },
  // ]);
  // return (
  //   <BrowserRouter basename={`${process.env.PUBLIC_URL}/`} router={router} />
  // );

  return (
    <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Main />} />
          <Route path="/search" element={<SearchBooks />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/writeArticle" element={<WriteArticle />} />
          <Route path="/articles" element={<LastArticleList />} />
          <Route path="/articles/:articleId" element={<Article />} />
          <Route path="/members/:memberId" element={<Member />} />
          <Route path="/articles/book/:isbn" element={<ArticleListByIsbn />} />
          <Route
            path="/articles/member/:memberId"
            element={<MemberArticles />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
