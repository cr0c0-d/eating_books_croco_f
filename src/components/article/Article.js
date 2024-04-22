import { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import axios from "axios";
import { useUser } from "../member/UserContext";
import BookCard from "../book/BookCard";
import BookDetail from "../book/BookDetail";
import { Image } from "react-bootstrap";
import { useAuthAPI } from "../../AuthAPI";

function Article() {
  const history = useNavigate();
  const location = useLocation();
  const [article, setArticle] = useState(null);
  const [book, setBook] = useState(null);
  const { userInfo, setUserInfo, logoutAPI } = useUser();
  const AuthAPI = useAuthAPI();

  // 글 정보 가져오기
  const getArticle = async () => {
    const response = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api${window.location.pathname}`,
      method: "GET",
    }).catch((error) => {
      if (error.response.status === 400) {
        alert("존재하지 않는 글입니다.");
        history(-1);
      } else if (error.response.status === 403) {
        alert("조회 권한이 없습니다.");
        history(-1);
      }
      return null;
    });

    if (response.status === 200) {
      // 조회 성공
      setArticle(response.data);
    }
    return response;
  };

  const getArticleAuth = async () => {
    AuthAPI({
      url: `/api${window.location.pathname}`,
      method: "GET",
      data: null,
      success: (response) => {
        if (response.status === 200) {
          // 조회 성공
          setArticle(response.data);
        }
      },
      fail: (error) => {
        if (error && error.response.status === 403) {
          alert("조회 권한이 없습니다.");
          history(-1);
        } else {
          // 로그인정보 없음 -> 로그인 페이지로 이동
          history("/login", { state: { beforeUrl: window.location.pathname } });
        }
      },
    });
  };

  const getBook = async () => {
    const response = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/books/${article.isbn}`,
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
  useEffect(() => {
    if (userInfo) {
      getArticleAuth();
    } else {
      getArticle();
    }
  }, []);
  useEffect(() => {
    if (article) {
      getBook();
    }
  }, [article]);

  const deleteArticle = () => {
    AuthAPI({
      url: `/api${window.location.pathname}`,
      method: "DELETE",
      data: null,
      success: (response) => {
        if (response.status === 200) {
          // 삭제 성공
          history(-1, { state: { beforeUrl: window.location.pathname } });
        }
      },
      fail: (error) => {
        if (error && error.response.status === 403) {
          alert("삭제 권한이 없습니다.");
          history(-1);
        } else {
          // 로그인정보 없음 -> 로그인 페이지로 이동
          history("/login", { state: { beforeUrl: window.location.pathname } });
        }
      },
    });
  };
  return (
    <div>
      <br />
      <br />
      {book ? <BookDetail book={book} /> : ""}
      <br />
      {article ? (
        <div>
          <h1 className="mt-4 mb-4">{article.title}</h1>
          <Row>
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => history(`/articles/member/${article.writerId}`)}
            >
              <h5>
                <Image
                  src={article.writerImg}
                  roundedCircle
                  style={{ width: "30px", height: "30px" }}
                />{" "}
                {article.writerNickname}
              </h5>
            </span>
            <h6>
              {article.createdAt}
              {article.editableYn ? (
                <span>
                  {" "}
                  <Button
                    size="sm"
                    onClick={() => {
                      history("/writeArticle", {
                        state: {
                          book: book,
                          article: article,
                        },
                      });
                    }}
                  >
                    수정
                  </Button>{" "}
                  <Button
                    size="sm"
                    onClick={() => {
                      if (window.confirm("삭제하시겠습니까?")) {
                        deleteArticle();
                      } else {
                        return;
                      }
                    }}
                  >
                    삭제
                  </Button>
                </span>
              ) : (
                ""
              )}
            </h6>
          </Row>

          <br />

          {article && article.writeType === "template"
            ? Object.entries(JSON.parse(article.content)).map(
                ([key, value]) => (
                  <div key={key}>
                    <br />
                    <Card>
                      <Card.Header>
                        {article.articleTemplateMap[key]}
                      </Card.Header>
                      <Card.Body>
                        <Card.Text>{value}</Card.Text>
                      </Card.Body>
                    </Card>
                    <br />
                  </div>
                )
              )
            : ""}
          {article && article.writeType === "editor" ? (
            <Card>
              <Card.Body>
                <div
                  dangerouslySetInnerHTML={{ __html: article.content }}
                ></div>
              </Card.Body>
            </Card>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Article;
