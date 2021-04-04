import React from "react"
import styles from './RadioSelectMenu.module.scss'
import UserRadioLabel from '../../FormElements/UserRadioLabel/UserRadioLabel'
import SearchInput from '../../FormElements/SearchInput/SearchInput'

const components = {
  user: UserRadioLabel,
}

const RadioSelectMenu = ({ objects, labelType, selected_object_id, changed }) => {
  let handleChange = (e) => {
    let object = objects.filter(el => String(el.id) === e.target.value)[0]
    changed(object)
  }
  let hide = () => {}

  console.log(selected_object_id)
  const LabelComponent = components[labelType]
  let objectLabels = objects.map(object => (
    <LabelComponent
      key={object.id}
      object={object}
      changed={handleChange}
      checked={String(selected_object_id) === String(object.id)}
      hide={hide}
    />
  ))
  return(
    <div className={styles.container}>
      <SearchInput />
      <div className={styles.labels}>
        {objectLabels}
      </div>
    </div>
    )
}

export default RadioSelectMenu
