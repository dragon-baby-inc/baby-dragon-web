import React, { useState } from 'react';
import styles from './UserCheckboxSelectLabel.module.scss'
import {
  Svg,
  Drawer,
  Image,
} from '../../../components'
import {
  useOwersFilterSelect
} from '../../../hooks'
import {
  userImageUrls
} from '../../../constants'

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
    let imageUrl = u.imageURL
    if (!imageUrl) {
      imageUrl = userImageUrls[u.imageId]
    }

    i++
    return(
      <Image style={{
        position: 'relative',
        right: i === 1 ? '0px' : `${10 * (i - 1)}px`,
        border: '2px solid white',
        borderRadius: '50%',
        zIndex: i
      }}
        key={i}
        size='40px'
        imageUrl={imageUrl} />
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
            <div className={styles.countSection}>
              <div className={styles.count}>
                {value ? value.length : 0}
              </div>
              <Svg
                style={{
                  marginLeft: '4px',
                  fontSize: '15px'
                }}
                icon='person'
                size='24'/>
            </div>
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


