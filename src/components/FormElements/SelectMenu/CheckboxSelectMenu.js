import React, { useState, useEffect } from "react"
import styles from './RadioSelectMenu.module.scss'
import UserCheckboxLabel from '../../FormElements/UserLabel/UserCheckboxLabel'
import SearchInput from '../../FormElements/SearchInput/SearchInput'

const components = {
  user: UserCheckboxLabel,
}

const CheckboxSelectMenu = ({ objects, labelType, selected_object_ids, changed }) => {
  const [selectedObjects, setSelectedObjects] = useState([])
  useEffect(() => {
    setSelectedObjects(objects.filter(el => selected_object_ids.includes(el.id)))
  }, [])

  let handleChange = (e) => {
    let selected_objects = selectedObjects
    if (e.target.checked) {
      selected_objects.push(...objects.filter(object => object.id == e.target.value))
    } else {
      selected_objects = selected_objects.filter(object => object.id != e.target.value)
    }

    setSelectedObjects(selected_objects)
    changed(selected_objects)
  }

  const LabelComponent = components[labelType]
  let objectLabels = objects.map(object => {
    return <LabelComponent
      key={object.id}
      object={object}
      changed={handleChange}
      checked={selectedObjects.map(el => el.id).includes(object.id)}
    />
  })
  return(
    <div className={styles.container}>
      <SearchInput />
      <div className={styles.labels}>
        {objectLabels}
      </div>
    </div>
    )
}

export default CheckboxSelectMenu
