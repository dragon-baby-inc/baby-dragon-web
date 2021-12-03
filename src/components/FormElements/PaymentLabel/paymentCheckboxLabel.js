import React, { useState, useEffect } from 'react';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import "../../../styleSheets/PaymentLabel.scss";
import { Collapse } from 'react-collapse';
import { useParams } from 'react-router-dom';
import Button from '../Button/Button'
import Checkbox from  '../Inputs/Checkbox'
import { useHistory } from "react-router-dom";

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
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [props.selectedPaymentIds])

  let object = props.object
  let activeClass = open ? 'active' : ''
  let amount = object.amount

  const handleLabelOnCheck = (e) => {
    if (e.target.checked) {
      setCollapseOpen(true)
    } else {
      setCollapseOpen(false)
    }
  }

  let i = 0
  const allocations = object.allocations.map(allo => {
    i += 1
    return(
      <div key={i} className='allocation'>
        <div className='allocationInner'>
          <span className='name'> { allo.ower_display_name } </span> <span className="amount">{props.currency_symbol}{allo.amount}</span>
        </div>
      </div>
    )
  })

  const handleDeleteClick = () => {
    props.deleted(object)
  }

  const handleEditClick = () => {
    history.push(`/liff_entry/groups/${group_id}/accounting_books/${accounting_book_id}/payments/${object.id}/edit`)
  }

  const handleCheckboxChaned = (e) => {
    setIsChecked(e.target.checked)
    props.changed(e)
  }

  let paidBack = ""
  if (object.paid_back) { paidBack = "paid-back" }

  return (
    <>
      <label className={`group-menu-label group-menu-checkbox-label group-menu-payment ${activeClass} ${paidBack}`}>
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
        <div className={`group-menu-image-block`}>
          {
            object.payer_image_url  ?
              <img className='group-menu-userimage' src={object.payer_image_url} alt="user"/>
              :
              <img className='group-menu-userimage' src='https://storage.googleapis.com/baby-dragon/public/dummy_user_L.png' alt="user"/>
          }
        </div>
        <div className={`group-menu-payment-block`}>
          <div className='group-menu-username'>
            <div className='description'>
              {
                object.paid_back ?
                  `還 ${object.allocations[0].ower_display_name}`
                  :
                  object.description
              }
            </div>
            <div className='message'>
              {
                object.paid_back ?
                  `${object.payer_display_name} 還款`
                  :
                  object.payer_display_name
              }
            </div>
          </div>
          <div className={`col-4 group-menu-amount`}>
            <div className='description'>
              {props.currency_symbol}{ amount }
            </div>
            <div className="message" >
              { object.allocations.length }人
            </div>
          </div>
        </div>
      </label>
      <Collapse isOpened={open}
        initialStyle={open ? { height: 'auto', overflow: 'initial' } : { height: '0px', overflow: 'hidden' }} >
        <div className={`payment collapse ${paidBack}`}>
          {
            true ?
              null
              :
                <div className='allocation title'>
                  <span> {object.ower_and_payer_message} </span>
                </div>
          }
          {
            object.paid_back ?
              null
              :
                <div className='allocations'>
                  {allocations}
                </div>
          }
          <div className='allocation buttons'>
            <div onClick={handleDeleteClick} className='btn'>
              刪除
            </div>
            <div onClick={handleEditClick} className='btn edit'>
              編輯
            </div>
          </div>
        </div>
      </Collapse>
    </>
  )
};

        // {
        //   open ?
        //     <div className='btn-group active'>
        //       <Button clicked={handleEditClick} className='icon'>
        //         <FontAwesomeIcon icon={faEdit}/>
        //       </Button>
        //     </div>
        //     :
        //     <div className='btn-group'>
        //       <Button className='icon'>
        //         <FontAwesomeIcon icon={faEdit}/>
        //       </Button>
        //     </div>
        // }
export default PaymentCheckboxLabel;
