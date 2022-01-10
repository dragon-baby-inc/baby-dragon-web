import React, { useState } from 'react';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import {
  themeColors
} from '../../../constants'
import "../../../styleSheets/userSummaryLabel.scss";
import styles from './LogMessageLabel.module.scss'
import {
  Svg,
  ColorBlock,
  Image,
} from '../../../components'

const UserSummaryLabel = (props) => {
  let object = props.object

  let icon;
  let color;
  switch(object.category) {
    case 'create_payment':
      icon = 'add'
      color = 'linear-gradient(92.29deg, #103C2B 0%, #07694D 100%)'
      break;
    case 'create_paid_back_payment':
      icon = 'add'
      color = 'linear-gradient(92.29deg, #103C2B 0%, #07694D 100%)'
      break;
    case 'update_payment':
      icon = 'edit'
      color = 'linear-gradient(92.29deg, #88631C 0%, #C5AF85 100%)'
      break;
    case 'delete_payment':
      icon = 'delete'
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
          <Image size='56px' imageUrl={object.user_image_url}/>
          <ColorBlock
            color={color}
            imageSize='24px'
            blockStyle={{
              position: 'absolute',
              top: 33,
              right: 0,
            }}>
            <Svg icon={icon} size='16' className='white'/>
          </ColorBlock>
        </div>
        <div className={styles.content}>
          <div className={styles.category}>
            {object.user_name + object.display_category}
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
