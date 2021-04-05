import React, { useState, useEffect } from "react"
import styles from './RadioSelectMenu.module.scss'
import UserRadioLabel from '../../FormElements/UserLabel/UserRadioLabel'
import SearchInput from '../../FormElements/SearchInput/SearchInput'

const components = {
  user: UserRadioLabel,
}

const RadioSelectMenu = ({ objects, labelType, selected_object_id, changed }) => {
  const [mount, setMount] = useState(false)
  const [displayObjects, setDisplayObjects] = useState(objects)

  let handleChange = (e) => {
    let object = objects.filter(el => String(el.id) === e.target.value)[0]
    changed(object)
  }

  useEffect(() => {
    setMount(true)
  }, [])

  const handleFilter = (e) => {
    let filter = e.target.value.toUpperCase();
    let display_objects = objects.filter(user => {
      return user.displayName.toUpperCase().indexOf(filter) > -1
    })

    setDisplayObjects(display_objects)
  }

  const handleFilterReset = (e) => {
    setDisplayObjects(objects)
  }

  const LabelComponent = components[labelType]
  let objectLabels = displayObjects.map(object => (
    <LabelComponent
      key={object.id}
      object={object}
      changed={handleChange}
      checked={String(selected_object_id) === String(object.id)}
    />
  ))

  const containerStyles = [styles.container]
  if (mount) { containerStyles.push(styles.mount) }

  return(
    <div className={containerStyles.join(' ')}>
      <SearchInput filtered={handleFilter}/>
      <div className={styles.labels}>
        {objectLabels}
      </div>
    </div>
    )
}

export default RadioSelectMenu
