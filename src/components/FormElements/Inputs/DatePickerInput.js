import React, { useEffect } from "react"
import datePickerStyles from './DatePickerInput.module.scss'
import { FontAwesomeIcon } from '../../../components'
import styles from './TextInput.module.scss'
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment/locale/zh-tw';

const DatePickerInput = ({
  name,
  labelStyle,
  changed,
  svg,
  value,
  placeholder,
  faicon,
  valid,
}) => {

  useEffect(() => {
    if (!value) { changed(moment().format('YYYY-MM-DD')) }
  }, [value, changed])

  const labelStyles = [styles.label]
  if (valid === false) { labelStyles.push(styles.invalid) }

  const handleChange = (e) => {
    changed(e.target.value)
  }

  const calendar = {
    sameDay: '[今日]',
    nextDay: '[明日]',
    nextWeek: 'L dddd',
    lastDay: '[昨日]',
    lastWeek: 'L dddd',
    sameElse: 'L dddd',
  }

  return(
    <div className={styles.container}>
      <label
        className={labelStyles.join(' ')} style={labelStyle} >
        <div className={styles.labelName}>
          <div className={styles.faIcon}>
            {
            faicon ?
              <FontAwesomeIcon faicon={faicon}/> : svg
            }
          </div>
          <div className={styles.name}>{name}</div>
        </div>
        <div className={datePickerStyles.value} >
          <Moment calendar={calendar} local locale="zh-tw">{value}</Moment>
        </div>
        <input
          value={value ? value : moment().format('YYYY-MM-DD')}
          placeholder={placeholder}
          onChange={handleChange}
          className={[styles.input, datePickerStyles.input].join(' ')}
          type='date' />
      </label>
    </div>
  )
}

export default DatePickerInput
// <Moment calendar={calendar} local locale="zh-tw">{value}</Moment>
