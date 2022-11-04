import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../features/jobs/alljobsSlice";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const dispatch = useDispatch();
  const {
    jobs,
    isLoading,
    page,
    numOfPages,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allJobs);

  React.useEffect(() => {
    dispatch(getAllJobs());
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);
  if (isLoading) {
    return (
      <section className="section-control">
        <h3 style={{ fontWeight: "bolder", textAlign: "center" }}>
          Loading...
        </h3>
      </section>
    );
  }

  if (jobs.length < 1) {
    return (
      <section className="section-control">
        <h3 style={{ fontWeight: "bolder", textAlign: "center" }}>
          No jobs to display...
        </h3>
      </section>
    );
  }
  return (
    <section className="section-control">
      <h5>
        {" "}
        {totalJobs} job{jobs.length > 0 && "s"} found
      </h5>
      {jobs.length > 0 && (
        <div className="jobs-container">
          {jobs.map((item) => (
            <Job key={item._id} {...item} />
          ))}
        </div>
      )}
      {numOfPages > 1 && <PageBtnContainer />}
    </section>
  );
};

export default JobsContainer;
