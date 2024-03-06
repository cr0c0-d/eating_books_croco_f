import Row from "react-bootstrap/Row";
import BookCard from "./BookCard";

function BookList({ books }) {
  return (
    <Row>
      {books.map((book) =>
        book.isbn13 ? <BookCard key={book.isbn13} book={book} /> : ""
      )}
    </Row>
  );
}

export default BookList;
