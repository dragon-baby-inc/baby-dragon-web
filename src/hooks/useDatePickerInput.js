import React, { useEffect, useState } from "react";
import { DatePickerInput } from "../components";

const useDatePickerInput = ({
  name,
  faicon,
  type,
  placeholder,
  invalidFeedback,
  valid,
  callback,
  initialValue,
}) => {
  const [value, setValue] = useState(initialValue ? initialValue : "");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (value) => {
    setValue(value);
    callback(value);
  };

  const input = (
    <DatePickerInput
      changed={handleChange}
      name={name}
      value={value}
      faicon={faicon}
    />
  );

  return [value, input];
};

export default useDatePickerInput;
