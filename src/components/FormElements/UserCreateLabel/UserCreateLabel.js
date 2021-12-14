import React, { useState } from 'react';
import styles from './UserCreateLabel.module.scss'
import { Image, ColorBlock, UserConfirmBox } from '../index'
import { FontAwesomeIcon } from '../../index'
import { themeColors } from '../../../constants'

const UserCreateLabel = ({
  children,
  clicked,
  value,
}) => {
  const [imageUserId, setUserImageId] = useState(0)
  const [editBoxActive, setEditBoxActive] = useState(false)
  const [userName, setUserName] = useState({ value: '', valid: true })

  const style = {
    image: {
      width: "56px",
      height: "56px",
      background: "linear-gradient(92.29deg, #88631C 0%, #C5AF85 100%)"
    }
  }

  return (
    <>
      <label className={styles.label} onClick={clicked}>
        <div className={styles.leftBox}>
          <div className={styles.colorBlock}>
            <ColorBlock></ColorBlock>
          </div>
          新增使用者
        </div>
        <FontAwesomeIcon faicon="faPlus" color={themeColors.gold700} style={{ fontSize: '18px' }}></FontAwesomeIcon>
      </label>
    </>
  )
};

export default UserCreateLabel
