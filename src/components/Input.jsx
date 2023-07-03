import React from "react";

const Input = ({
  labelClassName,
  value,
  error,
  onChange,
  name,
  id,
  type,
  placeholder,
  className,
  minLength,
  maxLength,
}) => {
  return (
    <label className={labelClassName}>
      <input
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        className={className}
        minLength={minLength}
        maxLength={maxLength}
        required
      />
      <span className="popup__input-error">
        {error && `Please fill out this field.`}
      </span>
    </label>
  );
};

export default Input;
