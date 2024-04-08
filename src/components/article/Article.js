import { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import AuthAPI from "../member/AuthAPI";
import { useUser } from "../member/UserContext";

function Article() {
  const history = useNavigate();
  const [article, setArticle] = useState(null);
  const { userInfo } = useUser();

  // 글 정보 가져오기
  const getArticle = async () => {
    const response = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api${window.location.pathname}`,
      method: "GET",
    }).catch((error) => {
      if (error.response.status === 400) {
        alert("존재하지 않는 글입니다.");
        history(-1);
      } else if (error.response.status === 403) {
        alert("조회 권한이 없습니다.");
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

  const getArticleAuth = async () => {
    AuthAPI({
      url: `/api${window.location.pathname}`,
      method: "GET",
      data: null,
      success: (response) => {
        if (response.status === 200) {
          // 조회 성공
          setArticle(response.data);
        }
      },
      fail: (error) => {
        if (error && error.response.status === 403) {
          alert("조회 권한이 없습니다.");
          history(-1);
        } else {
          // 권한 없음 -> 로그인 페이지로 이동
          history("/login", { state: { beforeUrl: window.location.pathname } });
        }
      },
    });
  };

  useEffect(() => {
    if (userInfo) {
      getArticleAuth();
    } else {
      getArticle();
    }
  }, []);

  return (
    <div>
      {article && article.writeType === "template"
        ? Object.entries(JSON.parse(article.content)).map(([key, value]) => (
            <div key={key}>
              <Card>
                <Card.Header>{article.articleTemplateMap[key]}</Card.Header>
                <Card.Body>
                  <Card.Text>{value}</Card.Text>
                </Card.Body>
              </Card>
              <br />
            </div>
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
