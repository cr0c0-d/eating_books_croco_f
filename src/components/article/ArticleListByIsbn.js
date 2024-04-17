import { useEffect, useState } from "react";
import ArticleList from "./ArticleList";
import BookDetail from "../book/BookDetail";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

function ArticleListByIsbn() {
  const [articleList, setArticleList] = useState(null);
  //const [book, setBook] = useState(null);
  const location = useLocation();
  const [book, setBook] = useState(null);

  const getBook = async (isbn) => {
    const response = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/books/${isbn}`,
      method: "GET",
    }).catch((error) => {
      alert("책 정보 조회에 실패했습니다.");
      return null;
    });

    if (response.status === 200) {
      // 조회 성공
      setBook(response.data.items[0]);
    }
    return response;
  };

  const getArticleListByIsbn = async () => {
    const axiosResponse = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api${window.location.pathname}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {});
    if (axiosResponse) {
      if (axiosResponse) {
        setArticleList(axiosResponse.data);
      }
    }
  };
  useEffect(() => {
    if (location.state != null) {
      const { book } = location.state;
      if (book === undefined) {
        const isbn = window.location.pathname.replace("/articles/book/", "");
        getBook(isbn);
      } else {
        setBook(book);
      }
    } else {
      const isbn = window.location.pathname.replace("/articles/book/", "");
      getBook(isbn);
    }
  }, []);
  useEffect(() => {
    if (book) {
      getArticleListByIsbn();
    }
  }, [book]);
  //   useEffect(() => {
  //     if (book) {
  //       getArticleListByIsbn();
  //     }
  //   }, [book]);
  return (
    <div>
      <br />
      <br />
      {book ? <BookDetail book={book} /> : ""}
      <br />
      <h4 className="mt-4 mb-4">이 책의 글</h4>
      {articleList ? (
        <ArticleList articleList={articleList} hideColumn={["bookTitle"]} />
      ) : (
        ""
      )}
    </div>
  );
}

export default ArticleListByIsbn;
