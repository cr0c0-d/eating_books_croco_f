import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const thisUrl = window.location.hostname;
    const response = await axios({
      url: "http://" + thisUrl + ":8080/login",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        email: formData.email,
        password: formData.password,
      },
    });
    if (response.status === 200) {
      history("/search");
    }
  };

  return (
    <div>
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
            </Form.Group>

            <Button variant="primary" type="submit" onClick={onSubmit}>
              로그인
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
