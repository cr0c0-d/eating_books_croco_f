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
    if (articleSave && articleMode === "template") {
      // articleSave가 true가 되면
      console.log("짠");
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
        console.log(responses);
        setArticleContents(responses);
      }
    }
  }, [articleSave]);

  return (
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
              <Form.Control
                as="textarea"
                rows={10}
                onChange={(e) => handleInputChange(t.num, e.target.value)}
                value={responses[t.id] || ""} // 입력값이 없을 경우 빈 문자열로 처리
              />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}

export default NewArticleTemplates;
