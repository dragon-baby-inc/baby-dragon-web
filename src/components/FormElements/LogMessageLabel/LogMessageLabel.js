import React, { useState } from 'react';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import "../../../styleSheets/userSummaryLabel.scss";

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
            <div className='group-menu-radio'>
              <input
                onChange={handleLabelOnCheck}
                checked={props.checked}
                type="checkbox"
                value={ object.payer_id }
              />
            </div>
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
        </div>
      </div>
    </>
  )
};

export default UserSummaryLabel;
