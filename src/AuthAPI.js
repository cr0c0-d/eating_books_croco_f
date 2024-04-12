import axios from "axios";

// 쿠키를 가져오는 함수
function getCookie(key) {
  var result = null;
  var cookie = document.cookie.split(";");
  cookie.some(function (item) {
    item = item.replace(" ", "");

    var dic = item.split("=");

    if (key === dic[0]) {
      result = dic[1];
      return true;
    }
  });

  return result;
}

// url = "/api/article"
// method = "POST"
// data = "{ index : 1, ... }"
// success, fail = 성공/실패시 메서드
const AuthAPI = async ({ url, method, data, success, fail }) => {
  console.log("AuthAPI");
  const refresh_token = getCookie("refresh_token");

  if (!refresh_token || !localStorage.getItem("userdata")) {
    return fail();
  }
  const authorization =
    "Bearer " + JSON.parse(localStorage.getItem("userdata")).accessToken;

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
      // 401 : unauthorized (액세스 토큰 만료)
      const res = await axios({
        url: `${process.env.REACT_APP_API_ROOT}/api/token`,
        method: "POST",
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          refreshToken: getCookie("refresh_token"),
        }),
      }).catch((error) => {
        // 리프레쉬 토큰도 잘못됨
        return fail(error);
      });

      if (res === undefined) {
        // 리프레쉬 토큰이 잘못됐으면
        localStorage.removeItem("userdata"); // userdata 삭제(로그인 상태 해제)
        //setUserInfo({}); // UserContext의 userInfo 삭제
        return;
      }

      if (res.status === 201 || res.status === 200) {
        // 재발급이 성공하면 로컬 스토리지값을 새로운 액세스 토큰으로 교체
        const userInfo = JSON.parse(localStorage.getItem("userdata"));
        userInfo.accessToken = res.data.accessToken;

        localStorage.setItem("userdata", JSON.stringify(userInfo));

        return AuthAPI({ url, method, data, success, fail }); // 요청을 다시 보냄
      }
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

export default AuthAPI;
