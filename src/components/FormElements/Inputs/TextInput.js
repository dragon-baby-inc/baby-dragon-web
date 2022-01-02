import React from "react"
import { themeColors } from '../../../constants'
import styles from './TextInput.module.scss'
import { FontAwesomeIcon, Svg } from '../../../components'

const TextInput = ({
  name,
  changed,
  value,
  placeholder,
  type,
  valid,
  faicon,
  svg,
  invalidFeedback,
  disabled,
  style,
  deleted,
  deleteActive,
  invalidFeedbackStyle
}) => {

  let labelClasses = [styles.label]
  if (valid === false) { labelClasses.push(styles.invalid) }
  if (disabled) { labelClasses.push(styles.disabled) }

  const handleDelete = (e) => {
    deleted(e)
    e.preventDefault()
  }

  let deleteIcon = null
  if (deleted) {
    if (deleteActive) {
      deleteIcon = <Svg icon='delete' size='24' className='red' clicked={handleDelete}/>
    } else {
      deleteIcon = null
    }
  }

  return(
    <div className={styles.container} style={style ? style : {}}>
      <label className={labelClasses.join(' ')} >
        <div className={styles.labelName}>
          <div className={styles.faIcon}>
            {
              faicon ?
                <FontAwesomeIcon faicon={faicon}/> : svg
            }
          </div>
          <div className={styles.name}>{name}</div>
        </div>
        <input
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={e => { changed(e.target.value) }}
          className={styles.input}
          type={type} />
        { deleteIcon }
      </label>
      {
        (valid === false) ?
          <div style={invalidFeedbackStyle} className={styles.invalidFeedback}>{invalidFeedback}</div> :
          null
      }
    </div>
  )
}

export default TextInput
