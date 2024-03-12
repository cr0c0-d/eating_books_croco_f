import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

function BookCard({ book }) {
  /**
   * <Card.Body>
          <Card.Text>
            {book.description.length > 43
              ? book.description.substring(0, 43) + "..."
              : book.description}
          </Card.Text>
        </Card.Body>
   */
  return (
    <Col>
      <Card style={{ width: "15rem" }} className="mb-4">
        <Card.Header as="h6">
          {book.title.length > 28
            ? book.title.substring(0, 28) + "..."
            : book.title}
        </Card.Header>

        <Card.Img variant="top" src={book.cover} style={{ height: "20rem" }} />

        <ListGroup className="list-group-flush">
          <ListGroup.Item>{book.author}</ListGroup.Item>
          <ListGroup.Item>{book.publisher}</ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
}

export default BookCard;
