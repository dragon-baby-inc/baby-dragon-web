import React, { useState, useEffect } from "react"
import styles from '../CheckboxSelect/DrawerCheckboxSelect.module.scss'
import { CheckboxLabel, Separater, Image } from '../index'
import {
  useSearchLabel
} from '../../../hooks'

const DrawerCheckboxSelect = ({
  objects,
  selectedObjects,
  createLabel,
  changed,
  closed
}) => {
  const [mount, setMount] = useState(false) /* eslint-disable no-unused-vars */
  const [selectAll, setSelectAll] = useState(true)
  const [_selectedObjects, setSelectedObjects] = useState(selectedObjects)
  const [displayObjects, setDisplayObjects] = useState(objects)

  useEffect(() => {
    setMount(true)
    setSelectedObjects(selectedObjects)
    setDisplayObjects(objects)
  }, [selectedObjects, objects])

  const handleFilter = (searchTerm) => {
    let filter = searchTerm.toUpperCase();
    let newObjects = objects.filter(user => {
      return user.displayName.toUpperCase().indexOf(filter) > -1
    })

    setDisplayObjects(newObjects)
  }

  const [searchValue, searchLabel] = useSearchLabel({
    reset: () => { setDisplayObjects(objects) },
    changed: handleFilter,
    closed: closed
  })

  let handleChange = (e) => {
    let selected_objects = [..._selectedObjects]
    if (e.target.checked) {
      selected_objects.push(...objects.filter(object => String(object.id) === String(e.target.value)))
    } else {
      selected_objects = selected_objects.filter(object => String(object.id) !== String(e.target.value))
    }

    setSelectAll(selected_objects.length === objects.length)
    setSelectedObjects(selected_objects)
    changed(selected_objects)
  }

  let objectLabels = displayObjects.map(object => {
    return createLabel({ object, handleChange, selectedObjects: _selectedObjects })
  })

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked)

    if (e.target.checked) {
      setSelectedObjects(objects)
      changed(objects)
    } else {
      setSelectedObjects([])
      changed([])
    }
  }

  const containerStyles = [styles.container]
  if (mount) { containerStyles.push(styles.mount) }
  return(
    <div className={styles.container}>
      { searchLabel }
      <CheckboxLabel
        changed={handleSelectAll}
        checked={selectAll}
      >
        <div className={styles.selectAll}>
          所有人
        </div>
      </CheckboxLabel >
      <Separater style={{ margin: 0 }}/>
      <div className={styles.labels}>
        {objectLabels}
      </div>
    </div>
  )
}

export default DrawerCheckboxSelect
