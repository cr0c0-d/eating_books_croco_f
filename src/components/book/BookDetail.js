import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import { ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookDetail({ book, clickClose }) {
  const history = useNavigate();
  return (
    <div>
      {book ? (
        <div>
          <ModalHeader>
            <h3>{book.title}</h3>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xl={4}>
                <Image
                  variant="top"
                  src={book.image}
                  fluid
                  style={{ width: "100%", height: "auto" }}
                />
              </Col>
              <Col xl={8}>
                <Row>
                  <div>
                    <p>
                      <Badge bg="secondary">저자</Badge> {book.author}
                    </p>
                  </div>
                </Row>
                <Row>
                  <div>
                    <p>
                      <Badge bg="secondary">출판사</Badge> {book.publisher}
                    </p>
                  </div>
                </Row>
                <Row>
                  <div>
                    <p>
                      <Badge bg="secondary">발행일</Badge>{" "}
                      {
                        // book.pubdate.length == 8
                        //   ? `${book.pubdate.substring(
                        //       0,
                        //       4
                        //     )}.${book.pubdate.substring(
                        //       4,
                        //       6
                        //     )}.${book.pubdate.substring(6, 8)}.`
                        //   : "정보없음"
                        book.pubdate
                      }
                    </p>
                  </div>
                </Row>
                <Row>
                  <div>
                    <Badge bg="secondary">책 소개</Badge>
                    <p style={{ whiteSpace: "pre-wrap" }}>{book.description}</p>
                  </div>
                </Row>

                {window.location.pathname === "/search" ? (
                  <div>
                    <br />
                    <br />
                    <Row>
                      <div>
                        <p style={{ textAlign: "right" }}>
                          아직 읽기 전이라면?{" "}
                          <Button
                            variant="primary"
                            onClick={() =>
                              history("/writeArticle", {
                                state: {
                                  book: book,
                                  article: { articleType: "B" },
                                },
                              })
                            }
                          >
                            식전문 쓰기
                          </Button>
                        </p>
                        <p style={{ textAlign: "right" }}>
                          다 읽었다면?{" "}
                          <Button
                            variant="primary"
                            onClick={() =>
                              history("/writeArticle", {
                                state: {
                                  book: book,
                                  article: { articleType: "A" },
                                },
                              })
                            }
                          >
                            식후문 쓰기
                          </Button>
                        </p>
                        <p style={{ textAlign: "right" }}>
                          <Button variant="secondary">
                            이 책에 대한 글 보기
                          </Button>
                        </p>
                      </div>
                    </Row>
                  </div>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => clickClose(null)}>
              닫기
            </Button>
          </ModalFooter>
        </div>
      ) : null}
    </div>
  );
}

export default BookDetail;
