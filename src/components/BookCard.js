import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

function BookCard({ book }) {
  return (
    <Col>
      <Card style={{ width: "18rem" }}>
        <Card.Header>
          <Card.Title>{book.title}</Card.Title>
        </Card.Header>

        <Card.Body>
          <Card.Img variant="top" src={book.cover} alt={book.title} />
          <Card.Text>{book.description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            {book.author}, {book.publisher}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href={book.link}>알라딘 상품 페이지</Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default BookCard;
