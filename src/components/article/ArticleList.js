import "../ellipsis.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Badge } from "react-bootstrap";

function ArticleList({ articleList, hideColumn }) {
  const history = useNavigate();

  // 각 컬럼의 너비
  let colWidth = {
    articleTitle: 6,
    writerNickname: 2,
    bookTitle: 3,
    createdAt: 1,
  };

  // 보여줄 컬럼 - 기본값은 모두 보여주기(true)
  let showColumn = { articleType: true, writerNickname: true, bookTitle: true };
  if (hideColumn) {
    hideColumn.map((col) => {
      showColumn[col] = false;
      colWidth.articleTitle += colWidth[col];
    });
  }

  return (
    <div style={{ textAlign: "center" }}>
      <ListGroup>
        <ListGroup.Item variant="success">
          <Row>
            <Col md={colWidth.articleTitle}>제목</Col>
            {showColumn.writerNickname ? (
              <Col md={colWidth.writerNickname}>작성자</Col>
            ) : (
              ""
            )}
            {showColumn.bookTitle ? (
              <Col md={colWidth.bookTitle}>책 제목</Col>
            ) : (
              ""
            )}
            <Col md={colWidth.createdAt}>작성일시</Col>
          </Row>
        </ListGroup.Item>
        {articleList && articleList.length > 0 ? (
          articleList.map((article) => (
            <ListGroup.Item key={article.id}>
              <Row>
                <Col
                  md={colWidth.articleTitle}
                  className="ellipsis"
                  style={{ textAlign: "left" }}
                >
                  {showColumn.articleType ? (
                    <span>
                      <Badge
                        pill
                        bg={article.articleType == "B" ? "success" : "primary"}
                      >
                        {article.articleType == "B" ? "식전문" : "식후문"}
                      </Badge>{" "}
                    </span>
                  ) : (
                    ""
                  )}
                  <span
                    onClick={() => history(`/articles/${article.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {article.title}
                  </span>
                </Col>
                {showColumn.writerNickname ? (
                  <Col md={colWidth.writerNickname} className="ellipsis">
                    <span
                      onClick={() =>
                        history(`/articles/member/${article.writerId}`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {article.writerNickname}
                    </span>
                  </Col>
                ) : (
                  ""
                )}
                {showColumn.bookTitle ? (
                  <Col md={colWidth.bookTitle} className="ellipsis">
                    <span
                      onClick={() => history(`/articles/book/${article.isbn}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {article.bookTitle}
                    </span>
                  </Col>
                ) : (
                  ""
                )}
                <Col md={colWidth.createdAt}>{article.createdAt}</Col>
              </Row>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>
            <Row className="justify-content-md-center">
              <Col style={{ textAlign: "center" }}>
                <span>등록된 글이 없습니다.</span>
              </Col>
            </Row>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
}

export default ArticleList;
