import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthAPI } from "../../AuthAPI";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import FileUpload from "../../FileUpload";
import axios from "axios";
import { useUser } from "./UserContext";
import ArticleList from "../article/ArticleList";

function MemberArticles() {
  const [memberInfo, setMemberInfo] = useState(null);
  const { userInfo, setUserInfo, logoutAPI } = useUser();
  const AuthAPI = useAuthAPI();

  const history = useNavigate();
  const getMemberArticles = async () => {
    const response = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api${window.location.pathname}`,
      method: "GET",
    }).catch((error) => {
      if (error) {
        alert("글 정보 조회에 실패했습니다.");
      }
    });

    if (response.status === 200) {
      // 조회 성공
      setMemberInfo(response.data);
    }
  };

  const getMemberArticlesAuth = async () => {
    AuthAPI({
      url: `/api${window.location.pathname}`,
      method: "GET",
      data: null,
      success: (response) => {
        if (response.status === 200) {
          // 조회 성공
          setMemberInfo(response.data);
        }
      },
      fail: (error) => {
        alert("글 정보 조회에 실패했습니다.");
        if (error && error.response.status === 403) {
          alert("조회 권한이 없습니다.");
          history(-1);
        } else {
          // 로그인정보 없음 -> 로그인 페이지로 이동
          history("/login", { state: { beforeUrl: window.location.pathname } });
        }
      },
    });
  };

  useEffect(() => {
    if (userInfo) {
      getMemberArticlesAuth();
    } else {
      getMemberArticles();
    }
  }, []);

  return (
    <div>
      {memberInfo ? (
        <div>
          <Row className="justify-content-md-center">
            <Col xs={3} md={3}>
              <Image fluid src={memberInfo.profileImg} roundedCircle />
            </Col>
            <Row className="justify-content-md-center">
              <Col xs={4} md={4} style={{ textAlign: "center" }}>
                <h4>{memberInfo.nickname}</h4>
              </Col>
            </Row>
          </Row>

          <br />
          <Row>
            <Col>
              <Row>총 작성 글 수</Row>
              <Row>{memberInfo.articlesAllCount}</Row>
            </Col>
            <Col>
              <Row>공개 글 수</Row>
              <Row>{memberInfo.publicArticleList.length}</Row>
            </Col>
          </Row>
          <br />
          <h4>공개 글 목록</h4>
          <ArticleList
            articleList={memberInfo.publicArticleList}
            hideColumn={["writerNickname"]}
          />
          <br />

          {memberInfo.privateArticleList ? (
            <div>
              <h4>비공개 글 목록</h4>
              <ArticleList
                articleList={memberInfo.privateArticleList}
                hideColumn={["writerNickname"]}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default MemberArticles;
