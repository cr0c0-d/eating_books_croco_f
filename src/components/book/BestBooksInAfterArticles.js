import axios from "axios";
import { useEffect, useState } from "react";
import BookList from "./BookList";

function BestBooksInBeforeArticles() {
  const [books, setBooks] = useState([]);

  const getBestBooksInBeforeArticles = async () => {
    const axiosResponse = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/books/best/before`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {});
    if (axiosResponse) {
      setBooks(axiosResponse.data);
    }
  };
  useEffect(() => {
    getBestBooksInBeforeArticles();
  }, []);
  return books.length === 0 ? (
    ""
  ) : (
    <div>
      <h3 className="mt-4 mb-4">식전문이 많은 책</h3>
      <BookList books={books} />
    </div>
  );
}

export default BestBooksInBeforeArticles;
