import React, { useState } from 'react';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import "../../../styleSheets/userSummaryLabel.scss";
import UserSummaryOwerLabel from './userSummaryOwerLabel'

const UserSummaryCollapse = (props) => {
  let labels = props.objects.map(object => {
    return(
      <UserSummaryOwerLabel object={object} accountingBookDetails={props.accountingBookDetails}/>
    )
  })

  return <>{labels}</>
};

export default UserSummaryCollapse;
