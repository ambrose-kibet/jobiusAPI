import React from "react";

const FormRowSelect = ({ name, label, value, handleChange, options }) => {
  return (
    <div className="form-row">
      <label className="label-text">{label || name}</label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      >
        {options.map((opt, i) => {
          return (
            <option value={opt} key={i}>
              {opt}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
