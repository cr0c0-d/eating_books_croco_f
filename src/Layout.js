import Navbar from "./Navbar";
import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./components/member/UserContext";
function Layout() {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
        <br />
      </Container>
    </>
  );
}

export default Layout;
