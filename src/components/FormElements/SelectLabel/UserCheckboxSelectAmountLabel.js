import React, { useState, useEffect } from 'react';
import styles from './UserCheckboxSelectLabel.module.scss'
import {
  FontAwesomeIcon,
  Drawer,
  Image,
  DrawerCheckboxSelect,
  TextInput
} from '../../../components'
import {
  useUserRadioSelect
} from '../../../hooks'
import {
  createUserCheckbokLabel
} from '../../../generators/labelGenerator'

const UserCheckboxSelectAmountLabel = ({
  users,
  selectedObjects,
  callback
}) => {
  const [drawerActive, setDrawerActive] = useState(false)

  const userSelectCallback = (object) => {
    if (callback) { callback(object) }
  }

  const handleClicked = () => {
    setDrawerActive(!drawerActive)
  }

  let i = 0
  const displayCount = selectedObjects.length > 5 ? 5 : selectedObjects.length
  const displayUsers = [...selectedObjects].slice(0, displayCount)
  const images = displayUsers.map(u => {
    i++
    return(
      <Image style={{
        position: 'relative',
        right: i === 1 ? '0px' : `${10 * (i - 1)}px`,
        border: '2px solid white',
        borderRadius: '50%',
        zIndex: i
      }}
        size='40px'
        imageUrl={u.imageURL} />
    )
  })

  return (
    <>
      <label className={styles.label} onClick={handleClicked}>
        <div className={styles.name}>
          {images}
          <div style={{
            position: 'relative',
            right: `${(displayCount - 1) * 10 - 8}px`
          }}>
            {selectedObjects.length}
            <FontAwesomeIcon
              faicon="farUser"
              style={{
                marginLeft: '4px',
                fontSize: '15px'
              }}
            />
          </div>
        </div>
        <div className={styles.icon}>
          選擇
        </div>
      </label>

      <Drawer
        open={drawerActive}
        closed={() => setDrawerActive(false)}>
        <DrawerCheckboxSelect
          selectedObjects={selectedObjects}
          createLabel={createUserCheckbokLabel}
          objects={users}
          changed={userSelectCallback}
          closed={() => setDrawerActive(false)}
        />
      </Drawer>
    </>
  )
};

export default UserCheckboxSelectAmountLabel
