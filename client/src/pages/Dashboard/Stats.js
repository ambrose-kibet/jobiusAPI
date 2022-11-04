import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatsContainer } from "../../components";
import ChartContainer from "../../components/ChartContainer";
import { showStats } from "../../features/jobs/alljobsSlice";
const Stats = () => {
  const dispatch = useDispatch();
  const { isLoading, MonthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  useEffect(() => {
    dispatch(showStats());
  }, []);
  if (isLoading) {
    return (
      <section className="minipage">
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      </section>
    );
  }
  return (
    <section className="minipage">
      <StatsContainer />
      <ChartContainer />
    </section>
  );
};

export default Stats;
