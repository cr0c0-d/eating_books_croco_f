import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ArticleList() {
  const history = useNavigate();
  const [articleList, setArticleList] = useState(null);
  // 글 목록 가져오기
  const getArticleList = async () => {
    const response = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/articles`,
      method: "GET",
    }).catch((error) => {
      if (error) {
        console.log(error);
      }
    });

    if (response.status === 200) {
      // 조회 성공
      setArticleList(response.data);
    }
    return response;
  };

  useEffect(() => {
    getArticleList();
  }, []);

  return (
    <div>
      <h1 className="mt-4 mb-4">최신 글 목록</h1>
      <ListGroup>
        <ListGroup.Item variant="success">
          <Row>
            <Col md="1">글 유형</Col>
            <Col md="5">제목</Col>
            <Col md="1">작성자</Col>
            <Col md="3">책 제목</Col>
            <Col md="2">작성일시</Col>
          </Row>
        </ListGroup.Item>
        {articleList
          ? articleList.map((article) => (
              <ListGroup.Item key={article.id}>
                <Row>
                  <Col md="1">
                    {article.articleType == "B" ? "식전문" : "식후문"}
                  </Col>
                  <Col md="5">
                    <span
                      onClick={() => history(`/articles/${article.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {article.title}
                    </span>
                  </Col>
                  <Col md="1">{article.writerNickname}</Col>
                  <Col md="3">
                    {article.bookTitle.length > 20
                      ? `${article.bookTitle.substring(0, 18)}...`
                      : article.bookTitle}
                  </Col>
                  <Col md="2">{article.createdAt}</Col>
                </Row>
              </ListGroup.Item>
            ))
          : ""}
      </ListGroup>
    </div>
  );
}

export default ArticleList;
