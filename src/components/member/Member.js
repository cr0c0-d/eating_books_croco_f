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

function Member() {
  const [memberInfo, setMemberInfo] = useState(null);
  const [profileImg, setProfileImg] = useState("");
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
        setProfileImg(response.data.profileImg);
      },
      fail: (err) => {
        if (err) {
          console.log(err);
          if (err.response.status == 403) {
            alert("권한이 없습니다.");
            history(-1);
          }
        }
      },
    });
  };
  useEffect(() => {
    findMember();
  }, []);

  // 이미지 업로드 imgbb 이용
  const imgUpload = async (file) => {
    const date = Date.now();

    const axiosResponse = await axios({
      url: "https://api.imgbb.com/1/upload",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        key: `${process.env.REACT_APP_IMGBB_KEY}`,
        image: file,
        name: "member" + date.valueOf(),
      },
    }).catch((err) => {
      console.log("실패");
      console.log(err);
    });
    if (axiosResponse) {
      console.log(axiosResponse);
      setMemberInfo({
        ...memberInfo,
        profileImg: axiosResponse.data.data.url,
      });
    }
  };

  const updateMember = () => {
    AuthAPI({
      url: "/api/members",
      method: "PUT",
      data: memberInfo,
      success: (response) => {
        console.log("성공");
        window.location.reload();
      },
      fail: (err) => {
        if (err) {
          console.log(err);
        }
      },
    });
  };

  return (
    <div>
      {memberInfo ? (
        <div>
          <h1 className="mt-4 mb-4">정보 수정</h1>
          <Form>
            <Row className="justify-content-md-center">
              <Col xs={3} md={3}>
                <Image fluid src={profileImg} roundedCircle />
              </Col>
              <Row className="justify-content-md-center">
                <Col xs={4} md={4}>
                  <Form.Control
                    type="text"
                    value={memberInfo.nickname}
                    onChange={(e) => {
                      setMemberInfo({
                        ...memberInfo,
                        nickname: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Form.Control
                  type="file"
                  onChange={(e) => {
                    //FileUpload({ file: e.target.files[0], type: "members" });
                    // setMemberInfo({
                    //   ...memberInfo,
                    //   profileImg: e.target.files[0],
                    // });
                    imgUpload(e.target.files[0]);
                    const imgUrl = URL.createObjectURL(e.target.files[0]);
                    setProfileImg(imgUrl);
                  }}
                />
              </Row>
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
            <Form.Group as={Row} className="mb-3"></Form.Group>
            <Button onClick={() => updateMember()}>저장</Button>
          </Form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default Member;
