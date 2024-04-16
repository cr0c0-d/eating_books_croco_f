import { useState, useEffect, useRef, useContext, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import AuthAPI from "../../AuthAPI";
import BookDetailModal from "../book/BookDetailModal";
import UpdateArticleTemplates from "./UpdateArticleTemplates";
import UpdateArticleEditor from "./UpdateArticleEditor";
import { useArticle } from "./ArticleContext";
import { useUser } from "../member/UserContext";

function UpdateArticle() {
  const history = useNavigate();
  const location = useLocation();
  const [templates, setTemplates] = useState(null);
  const [publicYn, setPublicYn] = useState(true);
  const [title, setTitle] = useState("");
  const { userInfo, setUserInfo, logoutAPI } = useUser();

  const [show, setShow] = useState(false);
  const {
    articleMode,
    setArticleMode,
    articleSave,
    setArticleSave,
    articleContents,
    setArticleContents,
  } = useArticle();
  const { book } = location.state;
  const article = location.state.article;

  const fail = () => {
    logoutAPI(false);
    location.state.beforeUrl = window.location.pathname;
    // 권한 없음 -> 로그인 페이지로 이동
    history(
      "/login",
      //state: { beforeUrl: window.location.pathname, isbn: isbn },
      { state: { ...location.state } }
    );
  };
  // 글 템플릿 가져오기
  useEffect(() => {
    if (article.id) {
      // 글을 수정하는 경우
      if (article.writeType == "template") {
        setArticleContents(JSON.parse(article.content));
      } else {
        setArticleContents(article.content);
      }
      setArticleMode(article.writeType);
      setTitle(article.title);
    } else {
      // 새 글을 작성하는 경우
      setArticleContents("");
      setArticleMode("template");
    }
    AuthAPI({
      url: "/api/articles/templates/" + article.articleType,
      method: "GET",
      data: null,
      success: (response) => {
        setTemplates(response.data);
      },
      fail: () => fail(),
    });
  }, []);

  // // isbn으로 책 가져오기
  // useEffect(() => {
  //   AuthAPI({
  //     url: "/api/books/" + isbn,
  //     method: "GET",
  //     data: null,
  //     success: (response) => {
  //       setBook(response.data);
  //     },
  //     fail: fail,
  //   });
  // }, []);

  const submit = () => {
    if (title === undefined || title === "") {
      alert("제목을 입력하세요!");
      return;
    }
    article.title = title;
    article.publicYn = publicYn;
    setArticleSave(true);
  };

  useEffect(() => {
    if (articleSave) {
      // 저장 메서드
      if (articleContents) {
        const data = {
          title: article.title,
          content: articleContents,
          isbn: book.isbn,
          bookTitle: book.title,
          writeType: articleMode,
          articleType: article.articleType,
          publicYn: article.publicYn,
        };

        if (articleMode === "template") {
          // 템플릿 모드
          data.content = JSON.stringify(articleContents);
        } else {
        }

        let url = "/api/articles";
        let method = "POST";
        if (article.id) {
          url += "/" + article.id;
          method = "PUT";
        }

        AuthAPI({
          url: url,
          method: method,
          data: data,
          success: (response) => {
            if (response.status === 200 || response.status === 201) {
              history("/articles/" + response.data.id);
            }
          },
          fail: (error) => {
            if (error) {
              alert("글 저장에 실패하였습니다.");
            }
          },
        });
      }
    }
  }, [articleContents]);

  return templates === null || book === null ? (
    ""
  ) : (
    <div>
      <Container>
        <h1 className="mt-4 mb-4">
          {article.articleType === "B" ? "식전문" : "식후문"} 작성
        </h1>
        <h4>
          [{book.title}]{" "}
          <Button variant="secondary" onClick={() => setShow(true)}>
            책 정보 보기
          </Button>
        </h4>
      </Container>
      <br />
      <Row>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>글 제목</Form.Label>
            <Form.Control
              type="text"
              placeholder="제목을 입력하세요."
              size="lg"
              value={article.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Tabs
          id="controlled-tab-example"
          activeKey={articleMode}
          onSelect={(k) => setArticleMode(k)}
          className="mb-3"
        >
          <Tab eventKey="template" title="템플릿으로 간단하게 작성하기">
            <UpdateArticleTemplates templates={templates} />
          </Tab>
          <Tab
            eventKey="editor"
            title="에디터로 자유롭게 작성하기"
            style={{ height: "850px" }}
          >
            <UpdateArticleEditor />
          </Tab>
        </Tabs>
      </Row>
      <br />
      <Row>
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
      </Row>
      <br />
      <Button variant="primary" onClick={submit}>
        저장
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered size="xl">
        <BookDetailModal book={book} clickClose={() => setShow(false)} />
      </Modal>
    </div>
  );
}

export default UpdateArticle;
