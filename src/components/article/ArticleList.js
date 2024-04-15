import "../ellipsis.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ArticleList({ articleList }) {
  const history = useNavigate();

  return (
    <div>
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
                  <Col md="5" className="ellipsis">
                    <span
                      onClick={() => history(`/articles/${article.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {article.title}
                    </span>
                  </Col>
                  <Col md="1">{article.writerNickname}</Col>
                  <Col md="3" className="ellipsis">
                    {article.bookTitle}
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
