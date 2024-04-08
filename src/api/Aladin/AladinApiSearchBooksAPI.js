import axios from "axios";

const AladinApiSearchBooksAPI = async ({ queryType, keyword, index }) => {
  const json = await axios({
    url: `${process.env.REACT_APP_API_ROOT}/api/books`,
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
