import React from "react";

const FormRow = ({ label, value, name, handleChange, type }) => {
  return (
    <div className="form-row">
      <label className="label-text">{label || name}</label>
      <input
        type={type || "text"}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
