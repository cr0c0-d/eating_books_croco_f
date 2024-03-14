import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import axios from "axios";

function SignUpForm() {
  //const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [nickname, setNickname] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  const history = useNavigate();

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
    if (!formData.nickname) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    }
    return newErrors;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      return signupApi();
    } else {
      setErrors(formErrors);
    }
  };

  const signupApi = async () => {
    const thisUrl = window.location.hostname;
    const json = await axios({
      url: "http://" + thisUrl + ":8080/signup",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        id: formData.email,
        password: formData.password,
        nickname: formData.nickname,
      }),
    });

    if (json.data === "id error") {
      setErrors({
        email: "사용중인 이메일입니다. 다른 이메일을 사용해주세요.",
      });
    } else {
      setErrors({});
      history(json.data.replace("redirect:", "/"));
    }

    return json.data;
  };

  return (
    <div>
      <Container>
        <div>
          <h1 className="mt-4 mb-4">회원가입</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                value={formData.email}
                type="email"
                name="email"
                onChange={handleChange}
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
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요."
              />
              {errors.password && (
                <Form.Text id="password" style={{ color: "red" }}>
                  {errors.password}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNickname">
              <Form.Label>닉네임</Form.Label>
              <Form.Control
                value={formData.nickname}
                type="text"
                name="nickname"
                onChange={handleChange}
                placeholder="닉네임을 입력하세요."
              />
              {errors.nickname && (
                <Form.Text id="nickname" style={{ color: "red" }}>
                  {errors.nickname}
                </Form.Text>
              )}
            </Form.Group>
            <Button variant="primary" type="submit" onClick={onSubmit}>
              회원가입
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default SignUpForm;
