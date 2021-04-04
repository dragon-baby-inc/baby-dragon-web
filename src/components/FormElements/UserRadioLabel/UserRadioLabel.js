import React from 'react';
import "../../../styleSheets/Radio.scss";
import "../../../styleSheets/CustomInput.scss";
import "../../../styleSheets/UserLabel.scss";

const userRadioLabel = (props) => {
  let user = props.object
  return (
    <label className='group-menu-label group-menu-radio-label'>
      <div className='group-menu-radio'>
        <input checked={props.checked} type="radio" name="payer-group-menu" data-type='payer' value={ user.id } onClick={props.changed} onChange={props.changed} />
        <span className="checkmark"></span>
      </div>
      <div className='group-menu-image-block'>
        {user.imageURL ?
        <img className='group-menu-userimage' src={user.imageURL}/>
        :
        <img className='group-menu-userimage' src='https://storage.googleapis.com/baby-dragon/public/dummy_user_L.png'/>
        }
      </div>
      <div className='col-8 group-menu-username'>
        { user.displayName }
      </div>
    </label>

  )
};

export default userRadioLabel;
