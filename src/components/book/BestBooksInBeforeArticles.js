import axios from "axios";
import { useEffect, useState } from "react";
import BookList from "./BookList";

function BestBooksInAfterArticles({ loaded }) {
  const [books, setBooks] = useState([]);

  const getBestBooksInAfterArticles = async () => {
    const axiosResponse = await axios({
      url: `${process.env.REACT_APP_API_ROOT}/api/books/best/after`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {});
    if (axiosResponse) {
      setBooks(axiosResponse.data);
      loaded(true);
    }
  };
  useEffect(() => {
    getBestBooksInAfterArticles();
  }, []);
  return books.length === 0 ? (
    ""
  ) : (
    <div>
      <h3 className="mt-4 mb-4">식후문이 많은 책</h3>
      <BookList books={books} />
    </div>
  );
}

export default BestBooksInAfterArticles;
