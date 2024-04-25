import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { useAuthAPI } from "../../AuthAPI";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      // 파라미터로 토큰이 있음 => oAuth2로 로그인한 것
      setUserInfo({ accessToken: token });
      findMemberByAccessToken(token);
    }
  }, []);

  const findMemberByAccessToken = async (token) => {
    const response = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/token/${token}`,
      method: "GET",
    }).catch((error) => {
      console.log(error);
    });
    if (response && response.status === 200) {
      const userdata = response.data;

      let newUserInfo = {};
      newUserInfo.nickname = userdata.nickname;
      newUserInfo.id = userdata.id;
      newUserInfo.role = userdata.role;
      newUserInfo.accessToken = token;
      setUserInfo(newUserInfo);
    }
  };
  // 로컬 스토리지에서 사용자 정보를 읽어와 초기 닉네임 상태 설정
  // useEffect(() => {
  //   const userdata = JSON.parse(localStorage.getItem("userdata"));
  //   if (userdata) {
  //     let newUserInfo = {};
  //     newUserInfo.nickname = userdata.nickname;
  //     newUserInfo.id = userdata.id;
  //     newUserInfo.role = userdata.role;
  //     newUserInfo.accessToken = userdata.accessToken;
  //     setUserInfo(newUserInfo);
  //   }
  // }, []);

  const logoutAPI = async (reloadYn) => {
    await axios({
      url: `${process.env.REACT_APP_API_ROOT}/logout`,
      method: "GET",
      withCredentials: true,
    }).then((response) => {
      if (response.status === 200) {
        //localStorage.removeItem("userdata");
        setUserInfo({});
        if (reloadYn) {
          window.location.href = "/search";
        }
      }
    });
  };

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, logoutAPI }}>
      {children}
    </UserContext.Provider>
  );
};
