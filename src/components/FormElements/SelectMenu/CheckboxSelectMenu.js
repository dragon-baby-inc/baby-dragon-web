import React, { useState, useEffect } from "react"
import styles from './RadioSelectMenu.module.scss'
import UserCheckboxLabel from '../../FormElements/UserLabel/UserCheckboxLabel'
import SearchInput from '../../FormElements/SearchInput/SearchInput'

const components = {
  user: UserCheckboxLabel,
}

const CheckboxSelectMenu = ({ objects, labelType, selected_object_ids, changed }) => {
  const [mount, setMount] = useState(false)
  const [displayObjects, setDisplayObjects] = useState(objects)
  const [searchValue, setSearchValue] = useState('')
  const [selectedObjects, setSelectedObjects] = useState([])

  useEffect(() => {
    setMount(true)
    setSelectedObjects(objects.filter(el => selected_object_ids.includes(el.id)))
  }, [objects, selected_object_ids])

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

  const containerStyles = [styles.container]
  if (mount) { containerStyles.push(styles.mount) }
  return(
    <div className={containerStyles.join(' ')}>
      <SearchInput reset={handleFilterReset} filtered={handleFilter} value={searchValue}/>
      <div className={styles.labels}>
        {objectLabels}
      </div>
    </div>
    )
}

export default CheckboxSelectMenu