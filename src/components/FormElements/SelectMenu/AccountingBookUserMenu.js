import React, { useState, useEffect } from "react"
import styles from './AccountingBookUserMenu.module.scss'
import UserCheckboxLabel from '../../FormElements/UserLabel/UserCheckboxLabel'
import SearchInput from '../../FormElements/SearchInput/SearchInput'

const components = {
  user: UserCheckboxLabel,
}

const AccountingBookUserMenu = ({ editMode, setEditMode, objects, labelType, selected_object_ids, changed }) => {
  const [mount, setMount] = useState(false)
  const [displayObjects, setDisplayObjects] = useState(objects)
  const [selectAll, setSelectAll] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [selectedObjects, setSelectedObjects] = useState([])

  useEffect(() => {
    setMount(true)
    setSelectedObjects(objects.filter(el => selected_object_ids.includes(el.id)))
  }, [objects, selected_object_ids, editMode])

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

  const handleFilter = (e) => {
    let filter = e.target.value.toUpperCase();
    let display_objects = objects.filter(user => {
      return user.displayName.toUpperCase().indexOf(filter) > -1
    })

    setDisplayObjects(display_objects)
    setSearchValue(e.target.value)
  }

  const handleFilterReset = (e) => {
    setDisplayObjects(objects)
    setSearchValue('')
  }

  const LabelComponent = components[labelType]
  let objectLabels = displayObjects.map(object => {
    return <LabelComponent
      key={object.id}
      object={object}
      changed={handleChange}
      checked={selectedObjects.map(el => el.id).includes(object.id)}
    />
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

  const selectAllLabel = <label className='group-menu-label group-menu-checkbox-label'>
    <div className='group-menu-radio'>
      <input
        checked={selectAll}
        onChange={handleSelectAll}
        type="checkbox"
      />
      <span className="checkmark"></span>
    </div>
    <div className='col-8 group-menu-username'>
      全選
    </div>
  </label>

  const containerStyles = [styles.container]
  if (mount) { containerStyles.push(styles.mount) }
  return(
      <div className={containerStyles.join(' ')}>

      <div className={styles.labels}>
        {objectLabels}
      </div>
    </div>
  )
}

export default AccountingBookUserMenu
