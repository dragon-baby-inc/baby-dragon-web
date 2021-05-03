import React, { useState, useEffect } from 'react';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import "../../../styleSheets/PaymentLabel.scss";
import { Collapse } from 'react-collapse';
import FormatString from "../../../utilities/FormatString"
import { themeColors } from '../../../constants/globalColors'
import { useParams } from 'react-router-dom';
import Button from '../Button/Button'
import Checkbox from  '../Inputs/Checkbox'
import { useHistory } from "react-router-dom";

import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/zh-tw';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/fontawesome-free-solid'

const PaymentCheckboxLabel = (props) => {
  const [ collapseOpen , setCollapseOpen ] = useState(false)
  const { group_id, accounting_book_id } = useParams();
  const history = useHistory();
  const open = collapseOpen && !props.editMode
  const [ isChecked, setIsChecked ] = useState(props.checked)

  useEffect(() => {
    setIsChecked(props.selectedPaymentIds.includes(object.id.toString()))
  }, [props.selectedPaymentIds])

  let object = props.object
  let formatString = new FormatString();
  let message = formatString.sliceToLength(object.ower_and_payer_message, 32, '...')
  let activeClass = open ? 'active' : ''
  let amount = object.amount

  const calendar = {
    sameDay: '[今日]',
    lastDay: '[昨日]',
    sameElse: 'M/DD',
    nextWeek: 'M/DD',
    lastWeek: 'M/DD',
  }

  const handleLabelOnCheck = (e) => {
    if (e.target.checked) {
      setCollapseOpen(true)
    } else {
      setCollapseOpen(false)
    }
  }

  const allocations = object.allocations.map(allo => {
    return(
      <div key={allo.id} className='allocation'>
        <div className='allocationInner'>
          <span className='name'> { allo.ower_display_name } </span> <span>{props.currency_symbol}{allo.amount}</span>
        </div>
      </div>
    )
  })

  const handleEditClick = () => {
    history.push(`/liff_entry/groups/${group_id}/accounting_books/${accounting_book_id}/payments/${object.id}/edit`)
  }

  const handleCheckboxChaned = (e) => {
    setIsChecked(e.target.checked)
    props.changed(e)
  }

  return (
    <>
      <label className={`group-menu-label group-menu-checkbox-label group-menu-payment ${activeClass}`}>
        {
          props.editMode ?
            null
            :
            <div className={`group-menu-date ${activeClass}`}>
              <Moment calendar={calendar} local locale="zh-tw">{object.created_at}</Moment>
            </div>

        }
        {
          props.editMode ?
            <Checkbox checked={isChecked} value={object.id.toString()} changed={handleCheckboxChaned}/>:
            <div className='group-menu-radio'>
              <input
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
          open ?
            <div className='btn-group active'>
              <Button clicked={handleEditClick} className='icon'>
                <FontAwesomeIcon icon={faEdit}/>
              </Button>
            </div>
            :
            <div className='btn-group'>
              <Button className='icon'>
                <FontAwesomeIcon icon={faEdit}/>
              </Button>
            </div>
        }
      </label>
      <Collapse isOpened={open}>
        <div className='payment collapse'>
          <div className='allocation title'>
            <span> {object.ower_and_payer_message} </span>
          </div>
          <div className='allocations'>
            {allocations}
          </div>
          <div className='allocation amount'>
            <span> 總計 {props.currency_symbol}{object.amount} </span>
          </div>
        </div>
      </Collapse>
    </>
  )
};

export default PaymentCheckboxLabel;
