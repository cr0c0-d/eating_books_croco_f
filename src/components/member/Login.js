import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useUser } from "./UserContext";

import axios from "axios";
import AuthAPI from "../../AuthAPI";

function Login() {
  const history = useNavigate();
  const location = useLocation();
  const { userInfo, setUserInfo } = useUser();
  const [loginStatus, setLoginStatus] = useState(true);

  // 로그인 성공시
  const loginSuccess = (res) => {
    if (res !== undefined && (res.status === 201 || res.status === 200)) {
      setUserInfo({ ...userInfo, accessToken: res.data.accessToken }); // userInfo 업데이트
      afterLoginRedirect();
    }
  };

  // 페이지 이동
  const afterLoginRedirect = () => {
    if (location.state && location.state.beforeUrl) {
      // 이전 페이지 기록이 있으면
      history(location.state.beforeUrl, { state: { ...location.state } });
    } else {
      // 기록이 없으면
      history("/search");
    }
  };

  // 로그인 전 토큰 확인
  const chkLoginStatus = () => {
    AuthAPI({
      url: "/api/token",
      method: "POST",
      data: null,
      success: loginSuccess,
      fail: () => {
        setLoginStatus(false);
      },
    });
  };

  useEffect(() => {
    chkLoginStatus();
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({});

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // 입력 값의 유효성 검사
  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }

    return newErrors;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      loginAPI();
    } else {
      setErrors(formErrors);
    }
  };

  const loginAPI = async () => {
    const response = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/loginProcessing`,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        email: formData.email,
        password: formData.password,
      },
      withCredentials: true,
    }).catch((error) => {
      if (error.code === "ERR_BAD_REQUEST") {
        setErrors({
          loginFail: "아이디 혹은 비밀번호를 확인해주세요. ",
        });
      }
    });
    if (response !== undefined && response.status === 200) {
      const userdata = {
        accessToken: response.data.accessToken,
        nickname: response.data.nickname,
        id: response.data.id,
        role: response.data.role,
      };
      localStorage.setItem("userdata", JSON.stringify(userdata));
      setUserInfo({
        nickname: response.data.nickname,
        id: response.data.id,
        role: response.data.role,
      });

      afterLoginRedirect();
    }
  };

  return (
    <div>
      {!loginStatus ? (
        <Container>
          <div>
            <h1 className="mt-4 mb-4">로그인</h1>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>이메일</Form.Label>
                <Form.Control
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="이메일을 입력하세요."
                />
                {errors.email && (
                  <Form.Text id="email" style={{ color: "red" }}>
                    {errors.email}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="비밀번호를 입력하세요."
                />
                {errors.password && (
                  <Form.Text id="email" style={{ color: "red" }}>
                    {errors.password}
                  </Form.Text>
                )}
              </Form.Group>

              {errors.loginFail && (
                <Form.Group className="mb-3">
                  <Form.Text id="email" style={{ color: "red" }}>
                    {errors.loginFail}
                  </Form.Text>
                </Form.Group>
              )}

              <Button variant="primary" type="submit" onClick={onSubmit}>
                로그인
              </Button>
            </Form>
          </div>
          <div>
            <Button href="/signup">회원가입</Button>
          </div>
          <div>
            <Button
              href={`${process.env.REACT_APP_API_ROOT}/oauth2/authorization/google`}
            >
              구글 로그인
            </Button>
          </div>
        </Container>
      ) : (
        ""
      )}
    </div>
  );
}

export default Login;
