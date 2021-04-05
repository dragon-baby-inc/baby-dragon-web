import React from 'react';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import "../../../styleSheets/UserLabel.scss";

const userCheckboxLabel = (props) => {
  let user = props.object
  return (
    <label className='group-menu-label group-menu-checkbox-label'>
      <div className='group-menu-radio'>
        <input
          checked={props.checked}
          onChange={props.changed}
          type="checkbox"
          value={ user.id }
        />
        <span className="checkmark"></span>
      </div>
      <div className='group-menu-image-block'>
        {user.imageURL ?
        <img className='group-menu-userimage' src={user.imageURL} alt="user"/>
        :
        <img className='group-menu-userimage' src='https://storage.googleapis.com/baby-dragon/public/dummy_user_L.png' alt="user"/>
        }
      </div>
      <div className='col-8 group-menu-username'>
        { user.displayName }
      </div>
    </label>
  )
};

export default userCheckboxLabel;
