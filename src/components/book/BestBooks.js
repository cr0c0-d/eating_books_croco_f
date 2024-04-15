import { useEffect, useState } from "react";
import BestBooksInBeforeArticles from "./BestBooksInAfterArticles";
import BestBooksInAfterArticles from "./BestBooksInBeforeArticles";
import BestSeller from "./BestSeller";

function BestBooks() {
  const [load1, setLoad1] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [load3, setLoad3] = useState(false);

  useEffect(() => {
    setLoad1(true);
  }, []);

  return (
    <div>
      {load1 ? <BestBooksInBeforeArticles loaded={setLoad2} /> : ""}
      <hr />
      {load2 ? <BestBooksInAfterArticles loaded={setLoad3} /> : ""}
      <hr />
      {load3 ? <BestSeller /> : ""}
    </div>
  );
}

export default BestBooks;
