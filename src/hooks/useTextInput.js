import React, { useState } from "react"
import { TextInput } from '../components'

const useTextInput = ({
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

  const input = <TextInput
    name={name}
    faicon={faicon}
    value={value}
    invalidFeedback={invalidFeedback}
    valid={valid}
    placeholder={placeholder}
    changed={e => handleChange(e)}
    type={type}
  />;

  return [value, input];
}

export default useTextInput;
