import React from "react"
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";

function Checkbox(props){
  return (
    <div className='group-menu-checkbox group-menu-label'>
      <input
        onChange={props.changed}
        type="checkbox"
        checked={props.checked}
        value={props.value}
      />
      <span className="checkmark"></span>
    </div>
  )
}

export default Checkbox
