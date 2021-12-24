import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import "../../../styleSheets/userSummaryLabel.scss";
import UserSummaryCollapse from '../UserSummaryCollapse/userSummaryCollapse'
import { Separater } from '../../../components/FormElements'

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

  let i = 0
  const debts = object.debts.map(allo => {
    i += 1
    return(
      <div key={i} className='allocation'>
        <div className='allocationInner'>
          <span className='name'> { allo.ower_display_name } </span>
          <span className="amount">{props.currency_symbol}{allo.amount}</span>
        </div>
        <div className='paidbackBtn'>
          還款
        </div>
      </div>
    )
  })

  return (
    <>
      <div className={`modal`}>
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
        <Separater style={{ margin: '0px 20px' }}/>
      </div>

      <Collapse isOpened={true}>
        <div className={`user-summary collapse`}>
          <div className='allocations'>
            {debts}
          </div>
          <div className='allocation buttons'>
            <div className='btn edit'>
              總計 {props.currency_symbol}{object.debts.reduce((pre, cur) => (cur.amount + pre), 0)}
            </div>
          </div>
        </div>
      </Collapse>
    </>
  )
};

export default UserSummaryLabel;
