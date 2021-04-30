import React, { useState } from 'react';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import "../../../styleSheets/PaymentLabel.scss";
import { Collapse } from 'react-collapse';
import FormatString from "../../../utilities/FormatString"
import { themeColors } from '../../../constants/globalColors'
import Button from '../Button/Button'

import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/zh-tw';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/fontawesome-free-solid'
import { faTrash } from '@fortawesome/fontawesome-free-solid'

const PaymentCheckboxLabel = (props) => {
  const [ collapseHeight , setcollapseHeight ] = useState(0)
  const [ collapseOpen , setCollapseOpen ] = useState(false)
  let object = props.object
  let message = object.ower_and_payer_message
  let formatString = new FormatString();
  let activeClass = collapseOpen ? 'active' : ''

  const calendar = {
    sameDay: '[今日]',
    lastDay: '[昨日]',
    sameElse: 'M-DD',
  }

  const handleLabelOnCheck = (e) => {
    if (e.target.checked) {
      setCollapseOpen(true)
    } else {
      setCollapseOpen(false)
    }
  }

  if (formatString.halfLength(message) > 32) {
    message = `${message.slice(0, 32)}...`
  }

  let amount = object.amount
  if (formatString.halfLength(amount.toString()) > 7) {
    amount = `${object.amount.toString().slice(0, 7)}...`
  }

  const allocations = object.allocations.map(allo => {
    return(
      <div key={allo.id} className='allocation'>
        <div className='allocationInner'>
          <span> {allo.ower_display_name} </span> <span>{props.currency_symbol}{allo.amount}</span>
        </div>
      </div>
  )
  })

  return (
    <>
      <label className={`group-menu-label group-menu-checkbox-label group-menu-payment ${activeClass}`}>
        <div className={`group-menu-date ${activeClass}`}>
          <Moment calendar={calendar} local locale="zh-tw">{object.created_at}</Moment>
        </div>
        {
          props.editMode ?
            <div className='group-menu-checkbox'>
              <input
                checked={props.checked}
                onChange={props.changed}
                type="checkbox"
                value={ object.id }
              />
              <span className="checkmark"></span>
            </div>:
            <div className='group-menu-radio'>
              <input
                checked={props.checked}
                onChange={handleLabelOnCheck}
                type="checkbox"
                value={ object.id }
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
              { object.description }
            </div>
            <div className='message'>
              { object.payer_display_name }
            </div>
          </div>
          <div className={`col-4 group-menu-amount ${activeClass}`}>
            { amount }
          </div>
        </div>
        {
          collapseOpen ?
            <div className='btn-group active'>
              <Button className='icon'>
                <FontAwesomeIcon icon={faEdit}/>
              </Button>
              <Button className='icon'>
                <FontAwesomeIcon icon={faTrash}/>
              </Button>
            </div>
            :
            <div className='btn-group'>
              <Button className='icon'>
                <FontAwesomeIcon icon={faEdit}/>
              </Button>
              <Button className='icon'>
                <FontAwesomeIcon icon={faTrash}/>
              </Button>
            </div>
        }
      </label>
      <Collapse isOpened={collapseOpen} style={{ maxHeight: collapseOpen ? collapseHeight : 0 }}>
        <div className='payment collapse'>
          <div className='allocation title'>
            <span> {object.ower_and_payer_message} </span>
            <span> {props.currency_symbol}{object.amount} </span>
          </div>
          <div className='allocations'>
            {allocations}
          </div>
        </div>
      </Collapse>
    </>
  )
};

export default PaymentCheckboxLabel;
