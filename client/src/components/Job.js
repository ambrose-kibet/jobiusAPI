import React from "react";
import { FaLocationArrow, FaRegCalendarAlt } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteJob, setEditing } from "../features/jobs/jobSlice";
import { Link } from "react-router-dom";
const Job = ({
  position,
  company,
  jobLocation,
  status,
  _id,

  createdAt,
  jobType,
}) => {
  const dispatch = useDispatch();
  return (
    <article className="job">
      <div className="job-header">
        <div className="job-header-logo">
          <h4>{company.charAt(0)}</h4>
        </div>
        <div className="job-header-info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </div>
      <hr />
      <div className="job-body">
        <h5>
          <FaLocationArrow /> <span>{jobLocation}</span>
        </h5>
        <h5>
          <FaRegCalendarAlt />{" "}
          <span>{moment(createdAt).format("MMMM DD YYYY")}</span>
        </h5>
        <h5>
          <MdWork /> <span>{jobType}</span>
        </h5>
        <p className={status}>{status}</p>
      </div>{" "}
      <div className="job-footer">
        <Link
          to={"/add-job"}
          className="btn edit-btn"
          onClick={() =>
            dispatch(
              setEditing({
                position,
                company,
                jobLocation,
                status,
                editJobId: _id,
                jobType,
              })
            )
          }
        >
          Edit
        </Link>
        <button
          type="button"
          className="btn delete-btn"
          onClick={() => dispatch(deleteJob(_id))}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default Job;
