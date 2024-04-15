import Row from "react-bootstrap/Row";
import BookCard from "./BookCard";
import Modal from "react-bootstrap/Modal";
import BookDetailModal from "./BookDetailModal";
import { useState } from "react";

function BookList({ books }) {
  const [show, setShow] = useState(false);
  const [bookDetail, setBookDetail] = useState(null);
  const onClickCard = (bookDetail) => {
    if (bookDetail) {
      setBookDetail(bookDetail);
    }
    setShow(!show);
  };

  return books === undefined ? (
    ""
  ) : (
    <div>
      <Row>
        {books.map((book) =>
          book.isbn ? (
            <BookCard key={book.isbn} book={book} clickCard={onClickCard} />
          ) : (
            ""
          )
        )}
      </Row>

      <Modal show={show} onHide={() => setShow(false)} centered size="xl">
        <BookDetailModal book={bookDetail} clickClose={onClickCard} />
      </Modal>
    </div>
  );
}

export default BookList;
