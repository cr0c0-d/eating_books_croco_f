import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../../AuthAPI";

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
  const { userInfo, setUserInfo } = useUser();

  const history = useNavigate();
  const findMemberArticles = async () => {
    const response = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api${window.location.pathname}`,
      method: "GET",
    }).catch((error) => {
      if (error) {
        console.log(error);
      }
    });

    if (response.status === 200) {
      // 조회 성공
      setMemberInfo(response.data);
    }
  };
  useEffect(() => {
    findMemberArticles();
  }, []);

  return (
    <div>
      {memberInfo ? (
        <div>
          <h1 className="mt-4 mb-4">회원 작성글 보기</h1>
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
          <ArticleList articleList={memberInfo.publicArticleList} />
          {memberInfo.privateArticleList ? (
            <div>
              <h4>비공개 글 목록</h4>
              <ArticleList articleList={memberInfo.privateArticleList} />
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
