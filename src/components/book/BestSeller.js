import axios from "axios";
import BookList from "./BookList";
import { useEffect, useState } from "react";

function BestSeller({ loaded }) {
  const [books, setBooks] = useState([]);

  const getBestSellers = async () => {
    const axiosResponse = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/books/best`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {});
    if (axiosResponse) {
      setBooks(axiosResponse.data.items);
      loaded();
    }
  };
  useEffect(() => {
    getBestSellers();
  }, []);
  return books.length === 0 ? (
    ""
  ) : (
    <div>
      <h3 className="mt-4 mb-4">베스트 셀러(알라딘 기준)</h3>
      <BookList books={books} />
    </div>
  );
}

export default BestSeller;
