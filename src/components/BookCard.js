import { CardTitle } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

function BookCard({ book }) {
  return (
    <Col>
      <Card style={{ width: "12rem" }}>
        <Card.Header as="h5">{book.title}</Card.Header>
        <Card.Img variant="top" src={book.cover} />
        <Card.Body>
          <Card.Text>{book.description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{book.author}</ListGroup.Item>
          <ListGroup.Item>{book.publisher}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href={book.link}>알라딘 상품 페이지</Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default BookCard;
