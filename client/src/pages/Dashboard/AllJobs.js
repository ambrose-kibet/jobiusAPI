import React from "react";
import { useSelector } from "react-redux";
import { JobsContainer, SearchContainer } from "../../components";

const AllJobs = () => {
  return (
    <section className="minipage">
      <SearchContainer />
      <JobsContainer />
    </section>
  );
};

export default AllJobs;
