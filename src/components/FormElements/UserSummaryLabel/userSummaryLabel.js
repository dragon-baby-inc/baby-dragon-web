import React, { useState } from 'react';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import "../../../styleSheets/userSummaryLabel.scss";
import { Collapse } from 'react-collapse';
import { themeColors } from '../../../constants/globalColors'
import Button from '../Button/Button'
import UserSummaryCollapse from '../UserSummaryCollapse/userSummaryCollapse'

import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/zh-tw';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/fontawesome-free-solid'
import { faTrash } from '@fortawesome/fontawesome-free-solid'

const UserSummaryLabel = (props) => {
  const [ collapseOpen , setCollapseOpen ] = useState(true)
  let object = props.object
  let activeClass = collapseOpen ? 'active' : ''

  const handleLabelOnCheck = (e) => {
    if (e.target.checked) {
      setCollapseOpen(true)
    } else {
      setCollapseOpen(false)
    }
  }

  return (
    <>
      <label className={`group-menu-label group-menu-checkbox-label group-menu-summary ${activeClass}`}>
        {
          props.editMode ?
            <div className='group-menu-checkbox'>
              <input
                checked={props.checked}
                onChange={props.changed}
                type="checkbox"
                value={ object.payer_id }
              />
              <span className="checkmark"></span>
            </div>:
            <div className='group-menu-radio'>
              <input
                onChange={handleLabelOnCheck}
                checked={props.checked}
                type="checkbox"
                value={ object.payer_id }
              />
            </div>
        }
        <div className={`group-menu-image-block ${activeClass}`}>
          {
            object.payer_image_url  ?
              <img className='group-menu-userimage' src={object.payer_image_url} alt="user"/>
              :
              <img className='group-menu-userimage' src='https://storage.googleapis.com/baby-dragon/public/dummy_user_L.png' alt="user"/>
          }
        </div>
        <div className={`group-menu-payment-block ${activeClass}`}>
          <div className='group-menu-username'>
            <div className='description'>
              {object.payer_display_name}
            </div>
          </div>
            <div className='group-menu-amount'>
              應收
            </div>
        </div>
      </label>
      <div>
        <div className='user-summary collapse'>
          <UserSummaryCollapse objects={object.debts} accountingBookDetails={props.accountingBookDetails}/>
        </div>
      </div>
    </>
  )
};

export default UserSummaryLabel;
