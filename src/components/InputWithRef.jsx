import React from "react";
import { forwardRef } from "react";

const InputWithRef = forwardRef(function InputWithRef(props, ref) {
  const { labelClassName, name, id, type, placeholder, className, onInput } =
    props;
  return (
    <label className={labelClassName}>
      <input
        ref={ref}
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        className={className}
        onInput={onInput}
        required
      />
    </label>
  );
});

export default InputWithRef;
