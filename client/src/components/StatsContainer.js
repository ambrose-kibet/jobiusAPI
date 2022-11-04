import React from "react";
import StatComponent from "./StatComponent";
import { MdPendingActions } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import { BsBugFill } from "react-icons/bs";
import { useSelector } from "react-redux";
const StatsContainer = () => {
  const {
    stats: { pending, declined, interview },
  } = useSelector((store) => store.allJobs);

  return (
    <div className="stats-container">
      <StatComponent
        icon={<MdPendingActions />}
        amount={pending}
        status="pending"
        info="pending interviews"
      />
      <StatComponent
        icon={<AiFillSchedule />}
        amount={interview}
        status="interview"
        info="interviews scheduled"
      />
      <StatComponent
        icon={<BsBugFill />}
        info="applications declined"
        amount={declined}
        status="declined"
      />
    </div>
  );
};

export default StatsContainer;
