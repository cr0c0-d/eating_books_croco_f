import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import BookDetail from "./BookDetail";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "axios";

function BookCard({ book, clickCard }) {
  return (
    <Col onClick={() => clickCard(book)}>
      <Card style={{ width: "15rem" }} className="mb-4">
        <Card.Header as="h6">
          {book.title.length > 28
            ? book.title.substring(0, 28) + "..."
            : book.title}
        </Card.Header>

        <Card.Img variant="top" src={book.image} style={{ height: "20rem" }} />

        <ListGroup className="list-group-flush">
          <ListGroup.Item>{book.author}</ListGroup.Item>
          <ListGroup.Item>{book.publisher}</ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
}

export default BookCard;
