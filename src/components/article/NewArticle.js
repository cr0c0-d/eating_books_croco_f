import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

import axios from "axios";

import AuthAPI from "../member/AuthAPI";
import BookDetail from "../book/BookDetail";

function NewArticle() {
  const location = useLocation();
  const [templates, setTemplates] = useState(null);
  const [publicYn, setPublicYn] = useState(true);

  const [show, setShow] = useState(false);
  const { book } = location.state;
  const articleType = location.state.articleType;
  // 글 템플릿 가져오기
  useEffect(() => {
    AuthAPI({
      url: "/api/articles/templates/" + articleType,
      method: "GET",
      data: null,
      success: (response) => {
        setTemplates(response.data);
      },
      fail: () => {
        console.log("실패");
      },
    });
  }, []);

  const submit = () => {};

  return templates === null ? (
    ""
  ) : (
    <div>
      <Container>
        <h1 className="mt-4 mb-4">
          {articleType === "B" ? "식전문" : "식후문"} 작성
        </h1>
        <h4>
          [{book.title}]{" "}
          <Button variant="secondary" onClick={() => setShow(true)}>
            책 정보 보기
          </Button>
        </h4>
      </Container>
      <br />
      <Container>
        <Alert variant="secondary">
          모든 항목을 작성하지 않아도 좋습니다. 원하는 항목만 자유롭게
          작성해보세요.
        </Alert>
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          {templates.map((t) => (
            <Accordion.Item eventKey={t.num} key={t.num}>
              <Accordion.Header>{t.content}</Accordion.Header>
              <Accordion.Body>
                <Form.Control as="textarea" rows={10} />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        <br />
        <Form>
          <Form.Label htmlFor="publicYn">글 공개 여부</Form.Label>
          <Form.Check
            type="switch"
            id="publicYn"
            checked={publicYn}
            onChange={() => setPublicYn((current) => !current)}
            label={publicYn ? "공개" : "비공개"}
            aria-describedby="publicYnHelpBlock"
          />
        </Form>
        <br />
        <Button variant="primary" onClick={submit}>
          저장
        </Button>
      </Container>

      <Modal show={show} onHide={() => setShow(false)} centered size="xl">
        <BookDetail book={book} clickClose={() => setShow(false)} />
      </Modal>
    </div>
  );
}

export default NewArticle;
