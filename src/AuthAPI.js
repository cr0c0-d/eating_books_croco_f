import axios from "axios";
import { useUser } from "./components/member/UserContext";

export const useAuthAPI = () => {
  const { userInfo, setUserInfo, logoutAPI } = useUser();

  const AuthAPI = async ({ url, method, data, success, fail }) => {
    console.log("AuthAPI");

    const authorization = "Bearer " + userInfo.accessToken;

    const axiosResponse = await axios({
      url: `${process.env.REACT_APP_API_ROOT}` + url,
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      data: data,
    }).catch(async (error) => {
      if (error.response.status === 401) {
        getNewAccessToken({
          url: url,
          method: method,
          data: data,
          success: success,
          fail: fail,
        });
      } else {
        return fail(error);
      }
    });
    if (
      axiosResponse &&
      (axiosResponse.status === 200 || axiosResponse.status === 201)
    ) {
      // 200 : ok / 201 : created
      return success(axiosResponse);
    }
    //return json;
  };

  // 새로운 액세스토큰 발급
  async function getNewAccessToken({ url, method, data, success, fail }) {
    const authorization = "Bearer " + userInfo.accessToken;

    const res = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/token`,
      method: "POST",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      data: null,
      withCredentials: true,
    }).catch((error) => {
      if (error.response.status === 500) {
        // 리프레쉬 토큰도 잘못됨
        return fail(error);
      }
    });

    if (res === undefined) {
      // 리프레쉬 토큰이 잘못됐으면
      //localStorage.removeItem("userdata"); // userdata 삭제(로그인 상태 해제)
      setUserInfo({});
      //setUserInfo({}); // UserContext의 userInfo 삭제
      return;
    }

    if (res.status === 201 || res.status === 200) {
      // 재발급이 성공하면 userInfo에 새로운 액세스 토큰 저장
      setUserInfo({ ...userInfo, accessToken: res.data.accessToken });

      return AuthAPI({
        url,
        method,
        data,
        success,
        fail,
      }); // 요청을 다시 보냄
    }
  }
  return AuthAPI;
};
