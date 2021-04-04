import React, { useState } from "react"
import styles from './SelectInput.module.scss'
import { themeColors } from '../../../constants/globalColors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/fontawesome-free-solid'

const TextInput = ({
  name,
  labelStyle,
  changed,
  clicked,
  value,
  placeholder,
  valid,
}) => {

  const [focus, setFocus] = useState(false)
  const handleClick = (e) => {
    clicked()
  }

  const labelStyles = [styles.label]
  if (focus) { labelStyles.push(styles.focus) }
  if (valid == false) { labelStyles.push(styles.invalid) }
  let displayValue = value ? value : placeholder
  if (displayValue.length > 12) {
    displayValue = `${value.slice(0, 12)}...`
  }

  return(
    <label
      onClick={handleClick}
      className={labelStyles.join(' ')}
      style={labelStyle}
    >
      <div className={styles.name}>{name}</div>
      <div
        className={styles.input}
      >{displayValue}</div>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={faChevronDown} color={themeColors.gray600}/>
      </div>
    </label>
  )
}

export default TextInput
