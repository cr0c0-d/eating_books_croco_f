import Navbar from "./Navbar";
import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";
import { useUser } from "./components/member/UserContext";
function Layout() {
  const { settingDone } = useUser();
  return (
    <>
      {settingDone ? (
        <div>
          <Navbar />
          <Container>
            <Outlet />
            <br />
          </Container>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Layout;
