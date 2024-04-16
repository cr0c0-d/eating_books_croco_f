import { useEffect, useState } from "react";
import ArticleList from "./ArticleList";
import axios from "axios";

function LastArticleList() {
  const [articleList, setArticleList] = useState(null);
  // 최신글 목록 가져오기
  const getArticleList = async () => {
    const response = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/articles`,
      method: "GET",
    }).catch((error) => {
      if (error) {
        alert("글 조회에 실패했습니다.");
      }
    });

    if (response.status === 200) {
      // 조회 성공
      setArticleList(response.data);
    }
    return response;
  };

  useEffect(() => {
    getArticleList();
  }, []);
  return (
    <div>
      <h1 className="mt-4 mb-4">최신 글 목록</h1>
      <ArticleList articleList={articleList} />
    </div>
  );
}

export default LastArticleList;
