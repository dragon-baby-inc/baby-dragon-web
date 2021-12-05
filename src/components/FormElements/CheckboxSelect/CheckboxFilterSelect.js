import React, { useState, useEffect } from "react"
import styles from './CheckboxFilterSelect.module.scss'
import {
  SearchInput,
  CheckboxLabel,
  Image
} from '../index'

const CheckboxFilterSelect = ({
  objects,
  selected_object_ids,
  style,
  createLabel,
  selectAll,
  changed,
  closed
}) => {
  const [mount, setMount] = useState(false) /* eslint-disable no-unused-vars */
  const [_selectAll, setSelectAll] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [selectedObjects, setSelectedObjects] = useState([])
  const [displayObjects, setDisplayObjects] = useState([])

  const handleFilter = (e) => {
    let searchTerm = e.target.value

    setSearchValue(searchTerm)

    let filter = searchTerm.toUpperCase();
    let newObjects = objects.filter(user => {
      return user.displayName.toUpperCase().indexOf(filter) > -1
    })

    setDisplayObjects(newObjects)
  }

  const handleReset = () => {
    setSearchValue('')
    setDisplayObjects(objects)
  }

  const searchInput = <SearchInput
    reset={handleReset}
    filtered={handleFilter}
    value={searchValue}
    closed={closed}
  />

  useEffect(() => {
    setMount(true)
    setSelectedObjects(objects.filter(el => selected_object_ids.includes(el.id)))
    setSelectAll(objects.length === selected_object_ids.length)
  }, [objects, selected_object_ids])

  useEffect(() => {
    setDisplayObjects(objects)
  }, [objects])

  let handleChange = (e) => {
    let selected_objects = selectedObjects
    if (e.target.checked) {
      selected_objects.push(...objects.filter(object => String(object.id) === String(e.target.value)))
    } else {
      selected_objects = selected_objects.filter(object => String(object.id) !== String(e.target.value))
    }

    setSelectedObjects(selected_objects)
    changed(selected_objects)
  }

  let objectLabels = displayObjects.map(object => {
    return createLabel({ object, handleChange, selectedObjects })
  })

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked)

    if (e.target.checked) {
      setSelectedObjects(displayObjects)
      changed(displayObjects)
    } else {
      setSelectedObjects([])
      changed([])
    }
  }

  const containerStyles = [styles.container]
  if (mount) { containerStyles.push(styles.mount) }
  return(
    <div style={style ? style: {}} className={containerStyles.join(' ')}>
      { searchInput }
      {
        selectAll ?
          <CheckboxLabel
            value="select-all"
            changed={handleSelectAll}
            checked={_selectAll}
          >
            <div className={styles.selectAll}>
              所有人
            </div>
          </CheckboxLabel > : null
      }
      <div className={styles.labels}>
        {objectLabels}
      </div>
    </div>
  )
}

export default CheckboxFilterSelect
