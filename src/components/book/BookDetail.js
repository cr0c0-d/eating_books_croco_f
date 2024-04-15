import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

function BookDetail({ book }) {
  return (
    <Row className="justify-content-md-center">
      <Col xl={8}>
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <Image
                  variant="top"
                  src={book.image}
                  fluid
                  //style={{ height: "40rem" }}
                />
              </Col>
              <Col xl={8}>
                <Row>
                  <h5>{book.title}</h5>
                </Row>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <Badge bg="secondary">저자</Badge> {book.author}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Badge bg="secondary">출판사</Badge> {book.publisher}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Badge bg="secondary">발행일</Badge>{" "}
                    {book.pubdate.length == 8
                      ? `${book.pubdate.substring(
                          0,
                          4
                        )}.${book.pubdate.substring(
                          4,
                          6
                        )}.${book.pubdate.substring(6, 8)}.`
                      : "정보없음"}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default BookDetail;
