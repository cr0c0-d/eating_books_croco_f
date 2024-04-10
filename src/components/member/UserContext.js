import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  // 로컬 스토리지에서 사용자 정보를 읽어와 초기 닉네임 상태 설정
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    if (userdata) {
      let newUserInfo = {};
      newUserInfo.nickname = userdata.nickname;
      newUserInfo.id = userdata.id;
      newUserInfo.role = userdata.role;
      setUserInfo(newUserInfo);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
