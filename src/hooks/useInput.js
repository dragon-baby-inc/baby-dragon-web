import React, { useState } from "react";

const useInput = ({ name, type, placeholder, initialValue }) => {
  const [value, setValue] = useState(initialValue ? initialValue : "");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const input = (
    <input
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(e) => handleChange(e)}
      type={type}
    />
  );

  return [value, input];
};

export default useInput;
