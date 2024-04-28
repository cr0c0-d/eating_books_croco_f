import BookListCarousel from "../book/BookListCarousel";
import { Col, Row } from "react-bootstrap";

function MemberBooks({ upcomingBooks, doneBooks }) {
  //const [loaded, setLoaded] = useState(false);

  return (
    <div>
      <Row>
        <Col>
          <h4>읽을 예정인 책 : {upcomingBooks.length}권</h4>
          {upcomingBooks.length === 0 ? (
            ""
          ) : (
            <BookListCarousel books={upcomingBooks} />
          )}
        </Col>
        <Col>
          <h4>다 읽은 책 : {doneBooks.length}권</h4>
          {doneBooks.length === 0 ? "" : <BookListCarousel books={doneBooks} />}
        </Col>
      </Row>
    </div>
  );
}

export default MemberBooks;
