import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

import axios from "axios";

import { useState } from "react";

import BookList from "./BookList";

function SearchBooks() {
  /**
   * 검색어
   */
  const [queryType, setQueryType] = useState("Keyword");
  const [keyword, setKeyword] = useState("");

  const onChangeSetKeyword = (event) => {
    setKeyword(event.target.value);
  };
  const onChangeQueryType = (event) => {
    setQueryType(event.target.value);
  };

  /**
   * 검색 API
   */
  const [books, setBooks] = useState([]);
  const thisUrl = window.location.hostname;

  const searchBooksAPI = async () => {
    const json = await axios({
      url: "http://" + thisUrl + ":8080/api/books",
      //`http://localhost:8080/api/books`,
      //await fetch(`http://localhost:8080/api/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        queryType: queryType,
        keyword: keyword,
      }),
    });
    setBooks(json.data.item);
    setLoading(false);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    searchBooksAPI();
  };

  /**
   * 로딩 spinner
   */
  const [loading, setLoading] = useState(false);

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
                <Button type="submit" onClick={onSubmit}>
                  검색
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
      <hr />
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <BookList books={books} />
      )}
    </div>
  );
}

export default SearchBooks;
