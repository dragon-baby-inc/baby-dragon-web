import React, { useState } from "react"
import { DatePickerInput } from '../components'

const useDatePickerInput = ({
  name,
  faicon,
  type,
  placeholder,
  invalidFeedback,
  valid,
  initialValue,
}) => {
  const [value, setValue] = useState((initialValue ? initialValue : ""));

  const handleChange = (value) => {
    setValue(value)
  }

  const input = <DatePickerInput
    changed={handleChange}
    name={name}
    value={value}
    faicon={faicon}
    />


  return [value, input];
}

export default useDatePickerInput;
