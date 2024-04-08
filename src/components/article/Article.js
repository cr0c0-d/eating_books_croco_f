import { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import axios from "axios";
function Article() {
  const history = useNavigate();
  // 글 정보 가져오기
  const thisUrl = "http://" + window.location.hostname + ":8080";
  const [article, setArticle] = useState(null);

  const getArticle = async () => {
    const response = await axios({
      url: thisUrl + "/api" + window.location.pathname,
      method: "GET",
    }).catch((error) => {
      console.log("error 발생");
      if (error.response.status === 400) {
        alert("존재하지 않는 글입니다.");
        history(-1);
      }
      return null;
    });

    if (response.status === 200) {
      // 조회 성공
      setArticle(response.data);
    }
    return response;
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <div>
      {article && article.writeType === "template"
        ? Object.entries(JSON.parse(article.content)).map(([key, value]) => (
            <Card key={key}>
              <Card.Header>{article.articleTemplateMap[key]}</Card.Header>
              <Card.Body>
                <Card.Text>{value}</Card.Text>
              </Card.Body>
            </Card>
          ))
        : ""}
      {article && article.writeType === "editor" ? (
        <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Article;
