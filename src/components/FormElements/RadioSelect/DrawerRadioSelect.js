import React, { useState, useEffect } from "react"
import styles from './DrawerRadioSelect.module.scss'
import {
  useSearchLabel,
} from '../../../hooks'
import {
  Separater
} from '../../../components'

const DrawerRadioSelect = ({
  objects,
  createLabel,
  changed,
  selectedObject,
  closed
}) => {
  const [displayObjects, setDisplayObjects] = useState(objects)
  /* eslint-disable no-unused-vars */
  const [_selectedObject, setSelectedObject] = useState(selectedObject)

  const handleFilter = (searchTerm) => {
    let filter = searchTerm.toUpperCase();
    let newObjects = objects.filter(user => {
      return user.displayName.toUpperCase().indexOf(filter) > -1
    })

    setDisplayObjects(newObjects)
  }

  /* eslint-disable no-unused-vars */
  const [_, searchLabel] = useSearchLabel({
    reset: () => { setDisplayObjects(objects) },
    changed: handleFilter,
    closed: closed
  })

  useEffect(() => {
    setSelectedObject(selectedObject)
  }, [selectedObject])

  useEffect(() => {
    setDisplayObjects(objects)
  }, [objects])

  let handleChange = (e) => {
    let object = objects.filter(el => String(el.id) === e.target.value)[0]
    setSelectedObject(object)
    changed(object)
  }

  let objectLabels = displayObjects.map(object => {
    return createLabel({ object, handleChange, selectedObject: _selectedObject })
  })

  return(
    <div className={styles.container}>
      { searchLabel }
      <Separater style={{ margin: 0 }}/>
      <div className={styles.labels}>
        {objectLabels}
      </div>
    </div>
  )
}

export default DrawerRadioSelect
