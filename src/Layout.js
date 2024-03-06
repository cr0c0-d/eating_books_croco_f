import Navbar from "./components/Navbar";
import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
