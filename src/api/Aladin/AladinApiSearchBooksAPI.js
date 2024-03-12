import axios from "axios";

const AladinApiSearchBooksAPI = async ({ queryType, keyword, index }) => {
  const thisUrl = window.location.hostname;
  const json = await axios({
    url: "http://" + thisUrl + ":8080/api/books",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      queryType: queryType,
      keyword: keyword,
      start: index,
    }),
  });
  return json.data;
};

export default AladinApiSearchBooksAPI;
