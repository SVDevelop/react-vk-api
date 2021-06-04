import React from "react";

const styles = { cursor: "pointer", margin: "0 2.5px 0 2.5px" }

export default function Pagination(props) {
  const { pagesCount, currentPage, setCurrentPage } = props;
    if (pagesCount) {
      let items = [];
      for (let i = 1; i < pagesCount + 1; i++) {
          items.push(i)
      }
      return (
      <div className="paginationList">
        <div className="pagination" key="prev" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} style={styles}>
          <span>Prev</span>
        </div>
        <BtnPagination {...props} items={items} />
        <div className="pagination" key="next" disabled={currentPage === pagesCount} onClick={() => setCurrentPage(currentPage + 1)} style={styles}>
          <span>Next</span>
        </div>
      </div>
      )
    } else {
        return null
    }
}

function BtnPagination ({items, currentPage, setCurrentPage}) {
    console.log(currentPage, items);
    return items.map((item, i) => (i+1 >= currentPage - 2 && i+1 <= currentPage + 2 ) && 
        (<div 
            key={i}
            className="pagination" 
            data-active={i+1 === currentPage} 
            style={styles} 
            onClick={e => setCurrentPage(i+1)}
        >
            <span>{i+1}</span>
        </div>));
}