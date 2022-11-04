import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FormRow } from "../../components";
import FormRowSelect from "../../components/FormRowSelect";
import {
  handleInput,
  clearValues,
  createJob,
  editJob,
} from "../../features/jobs/jobSlice";

const AddJob = () => {
  const {
    position,
    company,
    isLoading,
    jobType,
    jobTypeOptions,
    jobLocation,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({ position, company, editJobId, jobLocation, jobType, status })
      );
      return;
    }
    dispatch(createJob({ position, company, jobType, status, jobLocation }));
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleInput({ name, value }));
  };
  React.useEffect(() => {
    if (!isEditing) {
      dispatch(handleInput({ name: "jobLocation", value: user.location }));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className="minipage">
      <form className="generic-form" onSubmit={handleSubmit}>
        <h2>{isEditing ? "Edit job" : "Add job"}</h2>
        <div className="form-control">
          <FormRow
            name={"position"}
            value={position}
            handleChange={handleChange}
          />
          <FormRow
            name={"company"}
            value={company}
            handleChange={handleChange}
          />
          <FormRow
            name={"jobLocation"}
            value={jobLocation}
            label={"job Location"}
            handleChange={handleChange}
          />
          <FormRowSelect
            name={"status"}
            options={statusOptions}
            value={status}
            handleChange={handleChange}
          />
          <FormRowSelect
            name={"jobType"}
            label={"job Type"}
            options={jobTypeOptions}
            value={jobType}
            handleChange={handleChange}
          />
          <div className="save-btn-container split-container">
            <button className="save-btn btn" type="submit" disabled={isLoading}>
              submit
            </button>
            <button
              className="clear-btn btn"
              type="button"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddJob;
