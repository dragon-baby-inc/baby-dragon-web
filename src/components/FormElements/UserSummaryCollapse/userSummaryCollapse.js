import React, { useState } from 'react';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import "../../../styleSheets/userSummaryLabel.scss";
import { Collapse } from 'react-collapse';
import UserSummaryOwerLabel from './userSummaryOwerLabel'

import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/zh-tw';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/fontawesome-free-solid'
import { faTrash } from '@fortawesome/fontawesome-free-solid'

const UserSummaryCollapse = (props) => {
  const [ collapseOpen , setCollapseOpen ] = useState(true)
  let activeClass = collapseOpen ? 'active' : ''

  console.log(props.objects)

  const handleLabelOnCheck = (e) => {
    if (e.target.checked) {
      setCollapseOpen(true)
    } else {
      setCollapseOpen(false)
    }
  }

  let labels = props.objects.map(object => {
    return(
      <UserSummaryOwerLabel object={object} accountingBookDetails={props.accountingBookDetails}/>
    )
  })

  return (
    <>
      {labels}
    </>
  )
};

export default UserSummaryCollapse;
