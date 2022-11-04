import React, { useState } from "react";
import { useSelector } from "react-redux";
import AreaChartComponet from "./AreaChartComponet";
import BarChartComponet from "./BarChartComponet";

const ChartContainer = () => {
  const [Barchart, setBarchart] = useState(false);
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);
  return (
    <article className="chart-container">
      <h3>Monthly Applications</h3>
      <div className="chart-button-container">
        <button type="button" onClick={() => setBarchart(!Barchart)}>
          {Barchart ? "AreaChart" : "BarChart"}
        </button>
      </div>
      {Barchart ? (
        <BarChartComponet data={data} />
      ) : (
        <AreaChartComponet data={data} />
      )}
    </article>
  );
};

export default ChartContainer;
