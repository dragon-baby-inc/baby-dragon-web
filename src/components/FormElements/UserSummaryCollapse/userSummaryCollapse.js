import React from "react";
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import "../../../styleSheets/userSummaryLabel.scss";
import UserSummaryOwerLabel from "./userSummaryOwerLabel";

const UserSummaryCollapse = (props) => {
  let i = 0;
  let labels = props.objects.map((object) => {
    i += 1;
    return (
      <UserSummaryOwerLabel
        key={i}
        object={object}
        accountingBookDetails={props.accountingBookDetails}
      />
    );
  });

  return <>{labels}</>;
};

export default UserSummaryCollapse;
