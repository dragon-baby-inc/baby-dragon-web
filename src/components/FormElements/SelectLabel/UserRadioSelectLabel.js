import React, { useState, useEffect } from 'react';
import styles from './SelectLabel.module.scss'
import {
  FontAwesomeIcon,
  Drawer,
  Image,
  DrawerRadioSelect
} from '../../../components'
import {
  useUserRadioSelect
} from '../../../hooks'
import {
  createUserRadioLabel
} from '../../../generators/labelGenerator'

const UserRadioSelectLabel = ({
  users,
  user,
  initialValue,
  callback
}) => {
  const [drawerActive, setDrawerActive] = useState(false)

  const userSelectCallback = (object) => {
    setDrawerActive(false)
    if (callback) { callback(object) }
  }

  const handleClicked = () => {
    setDrawerActive(!drawerActive)
  }

  const getUserName = () => {
    if (!user) { return null }
    return user.displayName
  }

  const getUserImage = () => {
    if (!user) { return null }
    return user.imageURL
  }

  return (
    <>
      <label className={styles.label} onClick={handleClicked}>
        <div className={styles.name}>
          <Image style={{ paddingRight: '12px' }} size='56px' imageUrl={getUserImage()}/>
          {getUserName()}
        </div>
        <div className={styles.icon}>
          <FontAwesomeIcon
            style={{ fontSize: '14px' }}
            faicon="faChevronDown"
          />
        </div>
      </label>

      <Drawer
        open={drawerActive}
        closed={() => setDrawerActive(false)}>
        <DrawerRadioSelect
          selectedObject={user}
          createLabel={createUserRadioLabel}
          objects={users}
          changed={userSelectCallback}
          closed={() => setDrawerActive(false)}
        />
      </Drawer>
    </>
  )
};

export default UserRadioSelectLabel
