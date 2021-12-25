import React from 'react';
import styles from './UserCreateLabel.module.scss'
import {  ColorBlock } from '../index'
import { FontAwesomeIcon } from '../../index'
import { themeColors } from '../../../constants'

const UserCreateLabel = ({
  children,
  clicked,
  value,
}) => {
  return (
    <>
      <label className={styles.label} onClick={clicked}>
        <div className={styles.leftBox}>
          <div className={styles.colorBlock}>
            <ColorBlock></ColorBlock>
          </div>
          新增虛擬成員
        </div>
        <FontAwesomeIcon faicon="faPlus" color={themeColors.gold700} style={{ fontSize: '18px' }}></FontAwesomeIcon>
      </label>
    </>
  )
};

export default UserCreateLabel
