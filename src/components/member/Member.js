import { useEffect } from "react";
import AuthAPI from "../../AuthAPI";

function Member() {
  const findMember = () => {
    AuthAPI({
      url: `/api${window.location.pathname}`,
      method: "GET",
      data: null,
      success: (response) => {
        console.log("성공");
        console.log(response);
      },
      fail: () => {
        console.log("실패");
      },
    });
  };
  useEffect(() => {
    findMember();
  }, []);
  return <div></div>;
}
export default Member;
