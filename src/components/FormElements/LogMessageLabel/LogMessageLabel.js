import React, { useState } from 'react';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import {
  themeColors
} from '../../../constants'
import "../../../styleSheets/userSummaryLabel.scss";
import styles from './LogMessageLabel.module.scss'
import {
  ColorBlock,
  Image,
  FontAwesomeIcon
} from '../../../components'

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

  let faIcon;
  let color;
  console.log(object.category)
  switch(object.category) {
    case 'create_payment':
      faIcon = 'faPlus'
      color = 'linear-gradient(92.29deg, #103C2B 0%, #07694D 100%)'
      break;
    case 'update_payment':
      faIcon = 'faEdit'
      color = 'linear-gradient(92.29deg, #88631C 0%, #C5AF85 100%)'
      break;
    case 'delete_payment':
      faIcon = 'faTrash'
      color = 'linear-gradient(133.78deg, #D65C5C 2.04%, #BE2323 100%)'
      break;
    default:
      color = themeColors.green700
      break;

  }

  return (
    <>
      <label className={styles.label}>
        <div className={styles.img}>
          <Image size='56px' imageUrl={object.imageURL}/>
          <ColorBlock
            color={color}
            imageSize='24px'
            blockStyle={{
              position: 'absolute',
              top: 38,
              right: 0,
            }}>
            <FontAwesomeIcon faicon={faIcon} style={{ fontSize: '11px', color: 'ffffff' }}/>
          </ColorBlock>
        </div>
        <div className={styles.content}>
          <div className={styles.category}>
            {object.display_category}
          </div>
          <div className={styles.message}>
            {object.content}
          </div>
          <div className={styles.time}>
            {object.created_at}
          </div>
        </div>
      </label>
    </>
  )
};

export default UserSummaryLabel;
