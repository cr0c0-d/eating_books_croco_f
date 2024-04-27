import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [accessToken, setAccessToken] = useState(false);
  const [settingDone, setSettingDone] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let token = params.get("token");
    if (token && token !== undefined) {
      // 파라미터로 토큰이 있음 => oAuth2로 로그인한 것
      setAccessToken(token);
    } else {
      // 새 액세스토큰 발급 시도 (쿠키에 리프레시 토큰이 있을지도)
      getNewAccessToken();
    }
  }, []);

  useEffect(() => {
    // 액세스토큰이 있으면 사용자 정보 조회
    if (accessToken.length > 0) {
      findMemberByAccessToken(accessToken);
    } else if (accessToken.length === 0) {
      setSettingDone(true);
    }
  }, [accessToken]);

  const findMemberByAccessToken = async (token) => {
    if (token === undefined) {
      return;
    }
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
      //setSettingDone(true);
    }
  };

  useEffect(() => {
    if (
      !settingDone &&
      userInfo !== undefined &&
      userInfo.nickname !== undefined
    ) {
      setSettingDone(true);
    }
  }, [userInfo]);

  async function getNewAccessToken() {
    const res = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/token`,
      method: "POST",
      data: null,
      withCredentials: true,
    }).catch((error) => {
      // if (error && error.response.status === 500) {
      //   // 리프레쉬 토큰 없거나 잘못됨
      // }
      setAccessToken("");
    });

    if (res && (res.status === 201 || res.status === 200)) {
      // 액세스 토큰 재발급이 성공하면 userInfo에 새로운 액세스 토큰 저장
      setAccessToken(res.data.accessToken);
    } else {
    }
  }

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
    <UserContext.Provider
      value={{ userInfo, setUserInfo, logoutAPI, settingDone }}
    >
      {children}
    </UserContext.Provider>
  );
};
