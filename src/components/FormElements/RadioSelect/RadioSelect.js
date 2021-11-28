import React, { useState, useEffect } from "react"
import styles from './RadioSelect.module.scss'

const RadioSelect = ({
  objects,
  createLabel,
  changed
}) => {
  const [mount, setMount] = useState(false) /* eslint-disable no-unused-vars */
  const [selectAll, setSelectAll] = useState(true)

  useEffect(() => {
    setMount(true)
  }, [objects])

  let handleChange = (e) => {
    let object = objects.filter(el => String(el.id) === e.target.value)[0]
    changed(object)
  }

  let objectLabels = objects.map(object => {
    return createLabel({ object, handleChange })
  })

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

export default RadioSelect
