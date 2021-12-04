import React, { useEffect, useState } from "react"
import { TextInput } from '../components'

const useTextInput = ({
  name,
  faicon,
  type,
  placeholder,
  invalidFeedbackStyle,
  invalidFeedback,
  valid,
  style,
  initialValue,
  disabled,
  callback,
}) => {
  const [value, setValue] = useState((initialValue ? initialValue : ""));

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleChange = (value) => {
    setValue(value)
    if (callback) { callback(value) }
  }

  const input = <TextInput
    name={name}
    style={style}
    faicon={faicon}
    value={value}
    invalidFeedback={invalidFeedback}
    invalidFeedbackStyle={invalidFeedbackStyle}
    disabled={disabled}
    valid={valid}
    placeholder={placeholder}
    changed={e => handleChange(e)}
    type={type}
  />;

  return [value, input];
}

export default useTextInput;
