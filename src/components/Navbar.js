import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

function Navbar_c() {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">책먹는 악어</Navbar.Brand>
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="">책 목록</Nav.Link>
            <Nav.Link href="">글 목록</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="로그인사용자명">
              <NavDropdown.Item href="#">마이페이지</NavDropdown.Item>
              <NavDropdown.Item href="#">정보 수정</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">로그아웃</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar_c;
