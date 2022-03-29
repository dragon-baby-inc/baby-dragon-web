import React, { useState } from "react";
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import "./userSummaryOwerLabel.scss";
import { Collapse } from "react-collapse";
import FormatString from "../../../utilities/FormatString";

const UserSummaryOwerLabel = (props) => {
  const [collapseOpen, setCollapseOpen] = useState(true);
  let object = props.object;
  let activeClass = collapseOpen ? "active" : "";
  let name = object.ower_display_name;
  let accountingBookDetails = props.accountingBookDetails;

  if (FormatString.halfLength(name) > 9) {
    name = `${name.slice(0, 9)}...`;
  }

  const handleLabelOnCheck = (e) => {
    if (e.target.checked) {
      setCollapseOpen(true);
    } else {
      setCollapseOpen(false);
    }
  };

  return (
    <>
      <label
        className={`group-menu-label group-menu-checkbox-label group-menu-ower-label ${activeClass}`}
      >
        {props.editMode ? (
          <div className="group-menu-checkbox">
            <input
              checked={props.checked}
              onChange={props.changed}
              type="checkbox"
              value={object.ower_id}
            />
            <span className="checkmark"></span>
          </div>
        ) : (
          <div className="group-menu-radio">
            <input
              onChange={handleLabelOnCheck}
              checked={props.checked}
              type="checkbox"
              value={object.ower_id}
            />
          </div>
        )}
        <div className="group-menu-username">{name}</div>
        <div className="group-menu-amount">
          {accountingBookDetails.currency_symbol}
          {object.amount}
        </div>
      </label>
      <Collapse isOpened={false}>
        <div className="collapse"></div>
      </Collapse>
    </>
  );
};

export default UserSummaryOwerLabel;
