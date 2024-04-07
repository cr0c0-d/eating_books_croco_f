import axios from "axios";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

// url = "/api/article"
// method = "POST"
// data = "{ index : 1, ... }"
// success, fail = 성공/실패시 메서드
const AuthAPI = async ({ url, method, data, success, fail }) => {
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

  const authorization =
    "Bearer " + JSON.parse(localStorage.getItem("userdata")).accessToken;

  const thisUrl = "http://" + window.location.hostname + ":8080";
  const json = await axios({
    url: thisUrl + url,
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
    data: data,
  }).then(async (response) => {
    if (response.status === 200 || response.status === 201) {
      // 200 : ok / 201 : created
      return success(response);
    }
    const refresh_token = getCookie("refresh_token");
    if (response.status === 401 && refresh_token) {
      // 401 : unauthorized

      const res = await axios({
        url: thisUrl + "/api/token",
        method: "POST",
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          refreshToken: getCookie("refresh_token"),
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })

        .then((result) => {
          // 재발급이 성공하면 로컬 스토리지값을 새로운 액세스 토큰으로 교체
          const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          userInfo.accessToken = result.accessToken;

          localStorage.setItem("userInfo", userInfo);
          AuthAPI({ url, method, data, success, fail }); // 요청을 다시 보냄
        })

        .catch((error) => fail(error));
    } else {
      return fail();
    }
  });

  return json;
};

export default AuthAPI;
