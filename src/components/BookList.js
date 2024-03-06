import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BookCard from "./BookCard";

function BookList({ books }) {
  return (
    <Container>
      <Row>
        {books.map((book, index) => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </Row>
    </Container>
  );
}

export default BookList;
