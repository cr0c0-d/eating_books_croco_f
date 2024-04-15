import "../ellipsis.css";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import BookDetail from "./BookDetail";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "axios";

function BookCard({ book, clickCard }) {
  return (
    <Col onClick={() => clickCard(book)} style={{ cursor: "pointer" }}>
      <Card style={{ width: "15rem" }} className="mb-4">
        <Card.Header as="h6" className="ellipsis">
          {book.title}
        </Card.Header>

        <Card.Img variant="top" src={book.image} style={{ height: "20rem" }} />

        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <Badge bg="secondary">저자</Badge> {book.author}
          </ListGroup.Item>
          <ListGroup.Item>
            <Badge bg="secondary">출판사</Badge> {book.publisher}
          </ListGroup.Item>
          <ListGroup.Item>
            <Badge bg="secondary">발행일</Badge>{" "}
            {book.pubdate.length == 8
              ? `${book.pubdate.substring(0, 4)}.${book.pubdate.substring(
                  4,
                  6
                )}.${book.pubdate.substring(6, 8)}.`
              : "정보없음"}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
}

export default BookCard;
