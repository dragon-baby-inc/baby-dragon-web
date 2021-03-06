import React, { useState, useEffect } from 'react';
import styles from './UserCheckboxSelectLabel.module.scss'
import {
  Svg,
  Drawer,
  Image,
  EditableCheckboxSelect
} from '../../../components'
import {
  useOwersFilterSelect,
} from '../../../hooks'
import {
  userImageUrls
} from '../../../constants'
import {
  createEditableOwerCheckbokLabel
} from '../../../generators/labelGenerator'

const OwerEditableCheckboxSelectLabel = ({
  setSummaryAmount,
  exponent,
  setOwerAmount,
  setManualOwers,
  fixedAmount,
  getManualOwersAmount,
  users,
  manualOwers,
  selectedObjects,
  selectChanged
}) => {
  const [drawerActive, setDrawerActive] = useState(false)
  const [_selectObjectIds, setSelectObjectIds] = useState(new Set())
  const [_manualOwers, _setManualOwers] = useState(manualOwers)
  const valid = true

  useEffect(() => {
    _setManualOwers(manualOwers)
  }, [manualOwers])

  useEffect(() => {
    if (selectedObjects.length === _selectObjectIds.size) {
      return
    }

    if (selectedObjects) {
      setSelectObjectIds(new Set(selectedObjects.map(o => o.id)))
    } else {
      setSelectObjectIds(new Set(users.map(u => u.id)))
    }
  }, [users, selectedObjects])

  const handleSelectChanged = (objects) => {
    setSelectObjectIds(new Set(objects.map(obj => obj.id)))
    if (selectChanged) { selectChanged(objects) }
  }

  const handleClicked = () => {
    setDrawerActive(!drawerActive)
  }

  let select = <EditableCheckboxSelect
    exponent={exponent}
    setSummaryAmount={setSummaryAmount}
    getManualOwersAmount={getManualOwersAmount}
    fixedAmount={fixedAmount}
    setOwerAmount={setOwerAmount}
    setManualOwers={setManualOwers}
    manualOwers={_manualOwers}
    closed={() => setDrawerActive(false)}
    objects={users}
    createLabel={createEditableOwerCheckbokLabel}
    selectAll={true}
    selected_object_ids={_selectObjectIds}
    changed={handleSelectChanged}
    />

  let i = 0
  const selected = users.filter(o => _selectObjectIds.has(o.id))
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
              <div className={[styles.count, valid ? '' : styles.invalid].join(' ')}>
                {_selectObjectIds ? _selectObjectIds.size : 0}
              </div>
              <Svg
                className={valid ? null : 'invalid'}
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
          ??????
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

export default OwerEditableCheckboxSelectLabel


