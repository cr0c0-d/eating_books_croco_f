import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import { useUser } from "./components/member/UserContext";
import { redirect, useLocation, useNavigate } from "react-router-dom";

function Navbar_c() {
  const history = useNavigate();
  const location = useLocation();
  const { userInfo, setUserInfo, logoutAPI } = useUser();

  // const logoutAPI = async () => {
  //   await axios({
  //     url: `${process.env.REACT_APP_API_ROOT}/logout`,
  //     method: "GET",
  //     withCredentials: true,
  //   }).then((response) => {
  //     if (response.status === 200) {
  //       localStorage.removeItem("userdata");
  //       setUserInfo({});
  //       window.location.reload();
  //     }
  //   });
  // };
  const toLoginPage = () => {
    history("/login", {
      state: { ...location.state, beforeUrl: window.location.pathname },
    });
  };

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">책먹는 악어</Navbar.Brand>
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/search">책 검색</Nav.Link>
            <Nav.Link href="/articles">글 목록</Nav.Link>
          </Nav>
          <Nav>
            {userInfo.nickname ? (
              <NavDropdown title={userInfo.nickname}>
                <NavDropdown.Item href={`/articles/member/${userInfo.id}`}>
                  마이페이지
                </NavDropdown.Item>
                <NavDropdown.Item href={`/members/${userInfo.id}`}>
                  정보 수정
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logoutAPI(true)}>
                  로그아웃
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link onClick={toLoginPage}>로그인</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar_c;
