import React, { useState, useEffect } from "react"
import styles from './CheckboxSelect.module.scss'
import { CheckboxLabel, Image } from '../index'

const CheckboxSelect = ({
  objects,
  selected_object_ids,
  createLabel,
  changed
}) => {
  const [mount, setMount] = useState(false) /* eslint-disable no-unused-vars */
  const [selectAll, setSelectAll] = useState(true)
  const [selectedObjects, setSelectedObjects] = useState([])

  useEffect(() => {
    setMount(true)
    setSelectedObjects(objects.filter(el => selected_object_ids.includes(el.id)))
  }, [objects, selected_object_ids ])

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

  let objectLabels = objects.map(object => {
    return createLabel({ object, handleChange, selectedObjects })
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
    <div className={containerStyles.join(' ')}>
      <div className={styles.labels}>
        {objectLabels}
      </div>
    </div>
  )
}

export default CheckboxSelect
