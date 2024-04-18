import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const history = useNavigate();

  useEffect(() => {
    history("/search");
  }, []);

  return <div></div>;
}

export default Main;
