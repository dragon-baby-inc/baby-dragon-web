import React, { useState, useEffect } from "react"
import styles from './CheckboxSelect.module.scss'
import {
  CheckboxLabel,
  Separater,
  Warning,
  Image
} from '../index'

const CheckboxSelect = ({
  objects,
  warning,
  selected_object_ids,
  style,
  createLabel,
  selectAll,
  changed
}) => {
  const [mount, setMount] = useState(false) /* eslint-disable no-unused-vars */
  const [_selectAll, setSelectAll] = useState(true)
  const [selectedObjects, setSelectedObjects] = useState([])
  const [displayObjects, setDisplayObjects] = useState([])

  useEffect(() => {
    setMount(true)
    setSelectedObjects(objects.filter(el => selected_object_ids.includes(el.id)))
    setSelectAll(selected_object_ids.length === objects.length)
  }, [objects, selected_object_ids ])

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

    setSelectAll(selected_objects.length === objects.length)
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

  let labelHeight = "calc(100% - 44px - 1px)"
  if (warning) {
    labelHeight = "calc(100% - 44px - 1px - 20px)"
  }
  const containerStyles = [styles.container]
  if (mount) { containerStyles.push(styles.mount) }
  return(
    <div style={style ? style: {}} className={containerStyles.join(' ')}>
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
      <Separater style={{margin: '0px'}}/>
      <div style={{height: labelHeight}} className={styles.labels}>
        {objectLabels}
      </div>
      {
        warning ?
          <Warning name="找不到成員？請他在Line群組說說話喔！"></Warning>
          : null
      }
    </div>
  )
}

export default CheckboxSelect
