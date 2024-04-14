import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useArticle } from "./ArticleContext";

function NewArticleTemplates({ templates }) {
  const {
    articleMode,
    setArticleMode,
    articleSave,
    setArticleSave,
    articleContents,
    setArticleContents,
  } = useArticle();

  // 각 textarea의 값을 저장할 상태(state) 초기화
  const [responses, setResponses] = useState({});

  // 사용자 입력을 상태에 반영하는 함수
  const handleInputChange = (num, value) => {
    setResponses({
      ...responses,
      [num]: value,
    });
  };
  useEffect(() => {
    if (articleMode === "template") {
      setResponses(articleContents);
    }
  }, []);

  useEffect(() => {
    if (articleSave && articleMode === "template") {
      // articleSave가 true가 되면
      let validate = false;
      for (var i in responses) {
        if (responses[i] !== "") {
          validate = true;
          break;
        }
      }
      if (!validate) {
        alert("적어도 한 가지 문항은 작성해야 합니다!");
        return setArticleSave(false);
      } else {
        setArticleContents(responses);
      }
    }
  }, [articleSave]);

  return (
    <Container>
      {articleMode == "template" ? (
        <Container>
          <Alert variant="secondary">
            모든 항목을 작성하지 않아도 좋습니다. 원하는 항목만 자유롭게
            작성해보세요.
          </Alert>
          <Accordion
            defaultActiveKey={
              articleContents != null
                ? Object.keys(articleContents).map((key) => parseInt(key))
                : []
            }
            alwaysOpen
          >
            {templates.map((t) => (
              <Accordion.Item eventKey={t.id} key={t.id}>
                <Accordion.Header>{t.content}</Accordion.Header>
                <Accordion.Body>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    onChange={(e) => handleInputChange(t.id, e.target.value)}
                    value={responses[t.id] || ""} // 입력값이 없을 경우 빈 문자열로 처리
                  />
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
      ) : (
        ""
      )}
    </Container>
  );
}

export default NewArticleTemplates;
