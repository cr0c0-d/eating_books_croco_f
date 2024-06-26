import Pagination from "react-bootstrap/Pagination";

function Paging({ curIndex, totalResults, itemsPerPage, setIndex }) {
  const pages = [];
  const totalEndPage = Math.floor(totalResults / itemsPerPage) + 1;
  const curStartPage = Math.ceil(curIndex / 10) * 10 - 9;
  const curEndPage =
    curStartPage + 9 > totalEndPage ? totalEndPage : curStartPage + 9;
  for (var i = curStartPage; i <= curEndPage; i++) {
    pages[i - 1] = i;
  }

  return curIndex === undefined || totalResults === undefined ? (
    ""
  ) : (
    <Pagination>
      {curIndex !== 1 ? <Pagination.First onClick={() => setIndex(1)} /> : ""}
      {curIndex !== 1 ? (
        <Pagination.Prev onClick={() => setIndex(curIndex - 1)} />
      ) : (
        ""
      )}

      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={page === curIndex ? true : false}
          onClick={() => setIndex(page)}
        >
          {page}
        </Pagination.Item>
      ))}
      {curIndex !== totalEndPage ? (
        <Pagination.Next onClick={() => setIndex(curIndex + 1)} />
      ) : (
        ""
      )}
      {curIndex !== totalEndPage ? (
        <Pagination.Last onClick={() => setIndex(totalEndPage)} />
      ) : (
        ""
      )}
    </Pagination>
  );
}

export default Paging;
