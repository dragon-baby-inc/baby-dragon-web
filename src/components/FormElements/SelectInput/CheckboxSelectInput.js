import React from "react"
import styles from './SelectInput.module.scss'
import { themeColors } from '../../../constants/globalColors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/fontawesome-free-solid'

const CheckboxSelectInput = ({
  name,
  labelStyle,
  changed,
  clicked,
  value,
  placeholder,
  selectAll,
  valid,
}) => {

  const handleClick = (e) => {
    clicked()
  }

  const labelStyles = [styles.label]
  if (valid === false) { labelStyles.push(styles.invalid) }
  let displayValue = value ? `共 ${value.length} 人分` : placeholder
  if (selectAll) { displayValue = '所有人分' }

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

export default CheckboxSelectInput
