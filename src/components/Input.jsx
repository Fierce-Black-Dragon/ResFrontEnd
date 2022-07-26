import React from "react";
import "../style/input.css";
const Input = ({
  label,
  name,
  type,
  title,
  pattern,
  handleChange,
  placeholder,
  step,
  required,
  min,
  max,
}) => {
  return (
    <div className="container">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        title={title}
        onChange={handleChange}
        required={required ? true : false}
        step={step}
        min={min}
        max={max}
        placeholder={placeholder}
        pattern={pattern}
      />
    </div>
  );
};

export default Input;
