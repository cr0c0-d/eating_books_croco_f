import "../ellipsis.css";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "axios";

function BookCardSmall({ book, clickCard }) {
  return (
    <Col onClick={() => clickCard(book)} style={{ cursor: "pointer" }}>
      <Card style={{ width: "8rem" }} className="mb-4">
        <Card.Header as="h6" className="ellipsis">
          {book.title}
        </Card.Header>

        <Card.Img variant="top" src={book.image} style={{ height: "11rem" }} />

        <ListGroup className="list-group-flush">
          <ListGroup.Item className="ellipsis">{book.author}</ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
}

export default BookCardSmall;
