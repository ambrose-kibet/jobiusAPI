import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { changePage } from "../features/jobs/alljobsSlice";
const PageBtnContainer = () => {
  const dispatch = useDispatch();
  const { page, numOfPages } = useSelector((store) => store.allJobs);
  const pages = Array.from({ length: numOfPages }, (_, i) => {
    return i + 1;
  });
  const nextPage = () => {
    let pageNumber = page + 1;

    if (pageNumber > numOfPages) {
      pageNumber = 1;
    }
    dispatch(changePage(pageNumber));
  };
  const prevPage = () => {
    let pageNumber = page - 1;

    if (pageNumber < 1) {
      pageNumber = numOfPages;
    }
    dispatch(changePage(pageNumber));
  };

  return (
    <article className="pageBtnContainer">
      <button type="button" onClick={() => prevPage()}>
        <HiChevronDoubleLeft /> Prev
      </button>
      {pages.map((currentpage, index) => (
        <button
          key={index}
          type="button"
          onClick={() => dispatch(changePage(currentpage))}
          className={currentpage === page ? "active-page" : "reg-btn"}
        >
          {currentpage}
        </button>
      ))}
      <button type="button" onClick={() => nextPage()}>
        next <HiChevronDoubleRight />
      </button>
    </article>
  );
};

export default PageBtnContainer;
