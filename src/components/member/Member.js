import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthAPI } from "../../AuthAPI";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useUser } from "./UserContext";

function Member() {
  const [memberInfo, setMemberInfo] = useState(null);
  const [profileImg, setProfileImg] = useState("");
  const [saved, setSaved] = useState(false);
  const [showModalDeleteMember, setShowModalDeleteMember] = useState(false);
  const [enableDeleteMember, setEnableDeleteMember] = useState(false);
  const { userInfo, setUserInfo, logoutAPI } = useUser();
  const AuthAPI = useAuthAPI();

  const history = useNavigate();

  // 회원 정보 불러오기
  const findMember = () => {
    AuthAPI({
      url: `/api${window.location.pathname}`,
      method: "GET",
      data: null,
      success: (response) => {
        setMemberInfo({ ...response.data, password: "" });
        setProfileImg(response.data.profileImg);
      },
      fail: (err) => {
        if (err && err.response.status === 403) {
          alert("권한이 없습니다.");
          history(-1);
        } else if (!err || err.response.status === 500) {
          logoutAPI(false);
          history("/login", {
            state: { beforeUrl: window.location.pathname },
          });
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
    }).catch((err) => {});
    if (axiosResponse) {
      setMemberInfo({
        ...memberInfo,
        profileImg: axiosResponse.data.data.url,
      });
    }
  };

  // 회원 정보 저장
  const updateMember = () => {
    AuthAPI({
      url: "/api/members",
      method: "PUT",
      data: memberInfo,
      success: (response) => {
        if (Number(userInfo.id) === Number(memberInfo.id)) {
          setUserInfo({ ...userInfo, nickname: memberInfo.nickname });
        }
        //history(`/members/${memberInfo.id}`, { replace: true });
        setSaved(true);
      },
      fail: (err) => {
        if (err) {
          alert("회원정보 저장에 실패했습니다.");
        }
      },
    });
  };

  // 회원 정보 저장시 3초간 '저장되었습니다' 알림 표시
  useEffect(() => {
    if (saved === true) {
      // 5초 후 상태값을 변경하는 타이머 설정
      const timer = setTimeout(() => {
        setSaved(false); // 상태값을 true로 변경
      }, 3000); // 3000ms = 3초

      // 타이머 정리
      return () => clearTimeout(timer);
    }
  }, [saved]);

  const handleClose = () => {
    setShowModalDeleteMember(false);
    setEnableDeleteMember(false);
  };

  // 회원 정보 저장
  const deleteMember = () => {
    AuthAPI({
      url: `/api/members/${memberInfo.id}`,
      method: "DELETE",
      data: memberInfo,
      success: (response) => {
        logoutAPI();
        alert("탈퇴되었습니다.");
        history("/search");
      },
      fail: (err) => {
        if (err) {
          alert("회원 탈퇴에 실패했습니다.");
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
              <Row></Row>
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
                프로필 이미지
              </Form.Label>
              <Col sm="10">
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
              </Col>
            </Form.Group>
            <Button onClick={() => updateMember()}>저장</Button>
          </Form>
          <br />
          {saved ? <Alert variant="primary">저장되었습니다.</Alert> : ""}

          <Button
            variant="danger"
            onClick={() => {
              setShowModalDeleteMember(true);
            }}
          >
            회원 탈퇴
          </Button>

          <Modal show={showModalDeleteMember} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>회원 탈퇴</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>정말로 탈퇴하시겠습니까? </p>

              <p>
                작성한 모든 글은 삭제되지 않으며, 작성자는 '탈퇴한 사용자'로
                표시됩니다.
              </p>
              <p>
                탈퇴하시려면 아래 빈칸에 '회원탈퇴'를 입력하고 탈퇴 버튼을
                클릭하세요.
              </p>
              <Form.Control
                type="text"
                placeholder="회원탈퇴"
                onChange={(e) => {
                  if (e.target.value === "회원탈퇴") {
                    setEnableDeleteMember(true);
                  } else {
                    setEnableDeleteMember(false);
                  }
                }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                취소
              </Button>
              <Button
                variant="danger"
                disabled={!enableDeleteMember}
                onClick={deleteMember}
              >
                탈퇴
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default Member;
