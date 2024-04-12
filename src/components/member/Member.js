import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../../AuthAPI";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

function Member() {
  const [memberInfo, setMemberInfo] = useState(null);
  const [editNickname, setEditNickname] = useState(false);

  const history = useNavigate();
  const findMember = () => {
    AuthAPI({
      url: `/api${window.location.pathname}`,
      method: "GET",
      data: null,
      success: (response) => {
        console.log("성공");
        setMemberInfo({ ...response.data, password: "" });
      },
      fail: (err) => {
        if (err.response.status == 403) {
          alert("권한이 없습니다.");
          history(-1);
        }
      },
    });
  };
  useEffect(() => {
    findMember();
  }, []);
  return (
    <div>
      {memberInfo ? (
        <Form>
          <Row className="justify-content-md-center">
            <Col xs={3} md={3}>
              <Image
                fluid
                src="https://img1.daumcdn.net/thumb/C428x428/?scode=mtistory2&fname=https%3A%2F%2Ftistory4.daumcdn.net%2Ftistory%2F6777467%2Fattach%2F62d6465866e64df897d893fa9d46ea8e"
                roundedCircle
              />
              <Form.Control type="file" />
            </Col>
          </Row>
          <br />
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              이메일
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                value={memberInfo.email}
                readOnly
                plaintext
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              비밀번호
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                value={memberInfo.password}
                onChange={(e) => {
                  setMemberInfo({ ...memberInfo, password: e.target.value });
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              닉네임
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                value={memberInfo.nickname}
                onChange={(e) => {
                  setMemberInfo({ ...memberInfo, nickname: e.target.value });
                }}
              />
            </Col>
          </Form.Group>
          <Button>저장</Button>
        </Form>
      ) : (
        ""
      )}
    </div>
  );
}
export default Member;
