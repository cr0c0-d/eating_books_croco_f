import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";

import { useState, useRef, useEffect } from "react";

import BookList from "./BookList";
import Paging from "./Paging";

import AladinApiSearchBooksAPI from "../../api/Aladin/AladinApiSearchBooksAPI";
import BestBooks from "./BestBooks";

function SearchBooks() {
  /**
   * 검색어
   */
  const [queryType, setQueryType] = useState("Keyword");
  const [keyword, setKeyword] = useState("");
  const [index, setIndex] = useState(1);

  /**
   * 로딩 spinner
   */
  const [loading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const alertTarget = useRef(null);

  const onChangeSetKeyword = (event) => {
    if (event.target.value !== "") setShowAlert(false);
    setKeyword(event.target.value);
  };
  const onChangeQueryType = (event) => {
    setQueryType(event.target.value);
  };

  /**
   * 검색 API
   */
  const [books, setBooks] = useState([]);
  const [searchInfo, setSearchInfo] = useState([]);

  const aladinSearchBooks = async () => {
    AladinApiSearchBooksAPI({ queryType, keyword, index }).then((value) => {
      setSearchInfo(value);
      setBooks(value.items);
      setLoading(false);
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // 검색어가 없으면 alert 표시
    if (keyword === "") {
      setShowAlert(true);
    } else {
      chIdx(1);
    }
  };

  const chIdx = (idx) => {
    setIndex(idx);
    setLoading(true);
  };

  useEffect(() => {
    if (loading && keyword !== undefined && queryType !== undefined) {
      aladinSearchBooks();
    }
  }, [index, loading]);

  return (
    <div>
      <Container>
        <div>
          <h1 className="mt-4 mb-4">책 검색</h1>
          <Form inline="true">
            <Row>
              <Col xs="auto">
                <Form.Select
                  name="queryType"
                  value={queryType}
                  onChange={onChangeQueryType}
                >
                  <option value="Keyword">제목+저자</option>
                  <option value="Title">제목</option>
                  <option value="Author">저자</option>
                  <option value="Publisher">출판사</option>
                </Form.Select>
              </Col>
              <Col xs="4">
                <Form.Control
                  name="keyword"
                  value={keyword}
                  onChange={onChangeSetKeyword}
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className=" mr-sm-2"
                />
              </Col>
              <Col>
                <Button type="submit" onClick={onSubmit} ref={alertTarget}>
                  검색
                </Button>
                <Overlay
                  target={alertTarget.current}
                  show={showAlert}
                  placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      검색어를 입력하세요.
                    </Tooltip>
                  )}
                </Overlay>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
      <hr />
      {loading ? (
        <Modal>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Modal>
      ) : books.length != 0 ? (
        <div>
          <BookList books={books} />
          <hr />
          <Paging
            curIndex={searchInfo.start}
            totalResults={searchInfo.total}
            itemsPerPage={searchInfo.display}
            setIndex={chIdx}
          />
        </div>
      ) : (
        <div>
          <BestBooks />
        </div>
      )}
    </div>
  );
}

export default SearchBooks;
