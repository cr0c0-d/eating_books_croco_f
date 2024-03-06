import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";

import axios from "axios";

import Navbar from "./Navbar";
import { useEffect, useState } from "react";

function SearchBooks() {
  /**
   * 검색어
   */
  const [queryType, setQueryType] = useState("");
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
  const searchBooksAPI = async () => {
    const json = await axios({
      url: `http://localhost:8080/api/books`,
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
  };
  const onSubmit = (event) => {
    event.preventDefault();
    searchBooksAPI();
  };

  return (
    <div>
      <Navbar />
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

      <Stack>
        {books.map((book) => (
          <div>
            <a href={book.link}>
              <div>
                <h5 text={book.title}></h5>
                <small text={book.author}></small>
                <small text={book.pubdate}></small>
              </div>
              <div>
                <div>
                  <img
                    src={book.cover}
                    class="img-fluid rounded"
                    alt="게시물 이미지"
                  />
                </div>
                <div class="col-md-9">
                  <p class="mb-1" text={book.description}></p>
                </div>
              </div>
            </a>
            <hr />
          </div>
        ))}
      </Stack>
    </div>
  );
}

export default SearchBooks;
