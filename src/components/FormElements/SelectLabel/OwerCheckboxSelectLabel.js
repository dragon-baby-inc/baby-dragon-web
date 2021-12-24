import React, { useState, useEffect } from 'react';
import styles from './UserCheckboxSelectLabel.module.scss'
import {
  CheckboxSelect,
  useSearchLabel,
  FontAwesomeIcon,
  Drawer,
  Image,
  DrawerCheckboxSelect
} from '../../../components'
import {
  useUsersSelect,
  useOwersFilterSelect
} from '../../../hooks'

const OwerCheckboxSelectLabel = ({
  users,
  handleAddCoverCostUser,
  selectedObjects,
  callback
}) => {
  const [drawerActive, setDrawerActive] = useState(false)

  const userSelectCallback = (object_ids) => {
    if (callback) { callback(users.filter(u => object_ids.includes(u.id))) }
  }

  const handleClicked = () => {
    setDrawerActive(!drawerActive)
  }

  const buildSelectUsers = (users) => {
    return users.filter((u) => u.coverCost).map((u) => u.id)
  }

  const [value, select] = useOwersFilterSelect({
    handleAddCoverCostUser,
    users,
    buildSelectUsers,
    selectedObjects,
    selectAll: true,
    callback: userSelectCallback,
    closed: () => setDrawerActive(false) }
  )

  let i = 0
  const selected = users.filter(o => value.includes(o.id))
  const displayCount = selected.length > 5 ? 5 : selected.length
  const displayUsers = [...selected].slice(0, displayCount)
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
            {value ? value.length : 0}
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
        {select}
      </Drawer>
    </>
  )
};

export default OwerCheckboxSelectLabel


