import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import { useState } from "react";

function Navbar_c() {
  const [user, setUser] = useState(
    localStorage.getItem("userdata")
      ? JSON.parse(localStorage.getItem("userdata")).nickname
      : ""
  );

  const logoutAPI = async () => {
    const thisUrl = window.location.hostname;
    const response = await axios({
      url: "http://" + thisUrl + ":8080/logout",
      method: "GET",
      withCredentials: true,
    }).then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("userdata");
        window.location.reload();
      }
    });
  };

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">책먹는 악어</Navbar.Brand>
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/search">책 검색</Nav.Link>
            <Nav.Link href="">글 목록</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <NavDropdown title={user}>
                <NavDropdown.Item href="#">마이페이지</NavDropdown.Item>
                <NavDropdown.Item href="#">정보 수정</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutAPI}>
                  로그아웃
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">로그인</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar_c;
