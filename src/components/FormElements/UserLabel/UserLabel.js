import React, { useState } from 'react';
import { themeColors } from '../../../constants/globalColors'
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import "../../../styleSheets/UserLabel.scss";
import FontAwesomeIcon from '../../../utilities/FontAwesomeIcon'

const styles = {
  label: {
    paddingRight: '23px',
  },
  trash: {
    padding: '8px',
  }
}

const UserLabel = (props) => {
  let user = props.object

  return (
    <label style={styles.label} className='group-menu-label group-menu-checkbox-label'>
      <div className='group-menu-image-block'>
        {
          user.imageURL ?
            <img className='group-menu-userimage' src={user.imageURL} alt="user"/>
            :
            <img className='group-menu-userimage' src='https://storage.googleapis.com/baby-dragon/public/dummy_user_L.png' alt="user"/>
        }
      </div>
      <div className='col-8 group-menu-username'>
        { user.displayName }
        <span className='from-line'>
          { user.fromLine ? null : " (虛擬)" }
        </span>
      </div>
      {
        user.restrictedDestroy?
          null
          :
          <div style={styles.trash} onClick={() => { props.handleDeleteUser(user.id) }}>
            <FontAwesomeIcon faIcon="faTrash" color={themeColors.red} style={{ fontSize: '18px' }}/>
          </div>
      }
    </label>
  )
};
//           <div style={styles.trash} onClick={() => { props.handleDeleteUser(user.id) }}>
//             <FontAwesomeIcon faIcon="faTrash" color={themeColors.gray500} style={{ fontSize: '18px' }}/>
//           </div>

export default UserLabel;
