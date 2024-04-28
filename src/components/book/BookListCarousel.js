import Row from "react-bootstrap/Row";
import BookCardSmall from "./BookCardSmall";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import BookDetailModal from "./BookDetailModal";
import { useState } from "react";
import { Col } from "react-bootstrap";

function BookListCarousel({ books }) {
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
      {books.length > 3 ? (
        <Carousel variant="dark" indicators={false}>
          {books
            .filter((book) => book.isbn) // 유효한 ISBN을 가진 책만 필터링
            .reduce((acc, book, index) => {
              // 최대 5개의 책을 포함하는 그룹으로 분할
              const groupIndex = Math.floor(index / 3);
              if (!acc[groupIndex]) {
                acc[groupIndex] = []; // 새 그룹 생성
              }
              acc[groupIndex].push(book); // 현재 그룹에 책 추가
              return acc;
            }, [])
            .map((group, groupIndex) => (
              <Carousel.Item key={groupIndex}>
                <Row className="justify-content-md-center">
                  {group.map((book) => (
                    <Col key={book.isbn} xs="auto">
                      <BookCardSmall book={book} clickCard={onClickCard} />
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
        </Carousel>
      ) : (
        <Row>
          {books.map((book) => (
            <Col key={book.isbn} xs="auto">
              <BookCardSmall book={book} clickCard={onClickCard} />
            </Col>
          ))}
        </Row>
      )}

      <Modal show={show} onHide={() => setShow(false)} centered size="xl">
        <BookDetailModal
          book={bookDetail}
          clickClose={onClickCard}
          onlyInfo={false}
        />
      </Modal>
    </div>
  );
}

export default BookListCarousel;
