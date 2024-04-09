import { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";

import axios from "axios";
import AuthAPI from "../member/AuthAPI";
import { useUser } from "../member/UserContext";
import BookCard from "../book/BookCard";

function Article() {
  const history = useNavigate();
  const [article, setArticle] = useState(null);
  const [book, setBook] = useState(null);
  const { userInfo } = useUser();

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
          // 권한 없음 -> 로그인 페이지로 이동
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
      console.log(error.response);
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
  return (
    <div>
      {article ? (
        <div>
          <h1 className="mt-4 mb-4">{article.title}</h1>
          <Row>
            <h5>
              {article.writer.nickname} {article.createdAt}
            </h5>
          </Row>

          {book ? (
            <Row className="justify-content-md-center">
              <Col xl={8}>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Image
                          variant="top"
                          src={book.image}
                          fluid
                          //style={{ height: "40rem" }}
                        />
                      </Col>
                      <Col xl={8}>
                        <Row>
                          <h5>{book.title}</h5>
                        </Row>
                        <ListGroup className="list-group-flush">
                          <ListGroup.Item>
                            <Badge bg="secondary">저자</Badge> {book.author}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Badge bg="secondary">출판사</Badge>{" "}
                            {book.publisher}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Badge bg="secondary">발행일</Badge>{" "}
                            {book.pubdate.length == 8
                              ? `${book.pubdate.substring(
                                  0,
                                  4
                                )}.${book.pubdate.substring(
                                  4,
                                  6
                                )}.${book.pubdate.substring(6, 8)}.`
                              : "정보없음"}
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            ""
          )}
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
