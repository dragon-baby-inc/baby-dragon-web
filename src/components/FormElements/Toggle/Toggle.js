import React from 'react'
import Toggle from 'react-toggle'
import './Toggle.css'

const CustomToggle = ({
  defaultChecked,
  changed,
  name,
  disabled,
  checked,
  className,
  icons
}) => {
  return(
    <Toggle
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onChange={changed}
      className={className}
      name={name}
      icons={icons}
    />
  )
}

export default CustomToggle


