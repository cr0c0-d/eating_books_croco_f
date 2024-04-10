import "../ellipsis.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

function BookCard({ book }) {
  const onClickCard = async () => {
    const json = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/books/${book.isbn13}`,
      method: "GET",
    });
  };

  return (
    <Col onClick={onClickCard}>
      <Card style={{ width: "15rem" }} className="mb-4">
        <Card.Header as="h6" className="ellipsis">
          {book.title}
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
