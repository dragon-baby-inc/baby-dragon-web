import React, { useState } from 'react';
import styles from './SelectLabel.module.scss'
import {
  Svg,
  FontAwesomeIcon,
  Drawer,
  Image,
  DrawerRadioSelect
} from '../../../components'
import {
  createUserRadioLabel
} from '../../../generators/labelGenerator'
import {
  userImageUrls
} from '../../../constants'

const UserRadioSelectLabel = ({
  users,
  user,
  initialValue,
  callback,
  valid,
  style
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
    if (!user.fromLine) {
      return userImageUrls[user.imageId]
    } else {
      return user.imageURL
    }
  }

  let labelClasses = [styles.label]
  if (!valid) {
    labelClasses.push(styles.invalidLabel)
  }

  return (
    <>
      <label
        style={style ? style : {}}
        className={styles.label}
        onClick={handleClicked}>
        <div className={styles.name}>
          <Image style={{ paddingRight: '12px' }} size='56px' imageUrl={getUserImage()}/>
          {getUserName()}
        </div>
        <div className={styles.icon}>
          <Svg
            className='black'
            icon='downArrow'
            size='24'
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
