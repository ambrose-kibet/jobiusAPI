import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, handleInput } from "../features/jobs/alljobsSlice";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
const SearchContainer = () => {
  const dispatch = useDispatch();
  const { search, searchStatus, searchType, sort, sortOptions, isLoading } =
    useSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);

  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleInput({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };
  return (
    <form className="generic-form" onSubmit={handleSubmit}>
      <h2>search Form</h2>
      <div className="form-control">
        <FormRow name={"search"} value={search} handleChange={handleSearch} />
        <FormRowSelect
          name={"searchStatus"}
          label="status"
          value={searchStatus}
          handleChange={handleSearch}
          options={["all", ...statusOptions]}
        />
        <FormRowSelect
          name={"searchType"}
          label="search"
          value={searchType}
          handleChange={handleSearch}
          options={["all", ...jobTypeOptions]}
        />
        <FormRowSelect
          name={"sort"}
          value={sort}
          handleChange={handleSearch}
          options={sortOptions}
        />
        <div className="save-btn-container ">
          <button
            className="clear-btn btn delete-btn"
            disabled={isLoading}
            type="submit"
          >
            clear Filters
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchContainer;
