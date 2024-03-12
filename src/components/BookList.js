import Row from "react-bootstrap/Row";
import BookCard from "./BookCard";

function BookList({ books }) {
  return books === undefined ? (
    ""
  ) : (
    <div>
      <Row>
        {books.map((book) =>
          book.isbn13 ? <BookCard key={book.isbn13} book={book} /> : ""
        )}
      </Row>
    </div>
  );
}

export default BookList;
