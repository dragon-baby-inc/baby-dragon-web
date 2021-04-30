import React, { useState } from 'react';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import "../../../styleSheets/PaymentLabel.scss";
import { Collapse } from 'react-collapse';
import FormatString from "../../../utilities/FormatString"
import { themeColors } from '../../../constants/globalColors'
import Button from '../Button/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/fontawesome-free-solid'

const PaymentCheckboxLabel = (props) => {
  const [ collapseOpen , setCollapseOpen ] = useState(false)
  let object = props.object
  let message = object.ower_and_payer_message
  let formatString = new FormatString();
  let activeClass = collapseOpen ? 'active' : ''

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

  const allocations = object.allocations.map(allo => {
    return(
      <div className='allocation'>
        <span> {allo.ower_display_name} </span> 需負擔 {allo.amount}
      </div>
  )
  })

  return (
    <>
      <label className='group-menu-label group-menu-checkbox-label group-menu-payment'>
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
          <div className='col-4 group-menu-amount'>
            { object.amount }
          </div>
        </div>
        {
          collapseOpen ?
            <div className='btn-group active'>
              <Button className='icon'>
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
      <Collapse isOpened={collapseOpen}>
        <div className='payment collapse'>
          <div className='allocation'>
            <span> {object.ower_and_payer_message} </span>
          </div>
          {allocations}
        </div>
      </Collapse>
    </>
  )
};

export default PaymentCheckboxLabel;
