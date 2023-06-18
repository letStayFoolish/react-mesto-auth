import React from 'react';

const Input = ({
  labelClassName,
  value,
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
      {/* <span className='popup__input-error popup__input-error_type_image-name'> */}
      <span className='popup__input-error'>
        Необходимо заполнить данное поле
      </span>
    </label>
  );
};

export default Input;
