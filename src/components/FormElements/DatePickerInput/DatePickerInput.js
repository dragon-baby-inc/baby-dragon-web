import React, { useEffect } from "react"
import styles from './DatePickerInput.module.scss'
import '../DatePickerMenu/DatePickerStyle.css'
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment/locale/zh-tw';

const DatePickerInputText = ({
  name,
  labelStyle,
  changed,
  value,
  placeholder,
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
    <label
      className={labelStyles.join(' ')} style={labelStyle} >
      <span className={styles.name}>{name}</span>
      <div className={styles.value} >
        <Moment calendar={calendar} local locale="zh-tw">{value}</Moment>
      </div>
      <input
        value={value ? value : moment().format('YYYY-MM-DD')}
        placeholder={placeholder}
        onChange={handleChange}
        className={styles.input}
        type='date' />
    </label>
  )
}
//       <DayPickerInput
//         onDayChange={handleChange}
//         overlayComponent={DatePickerOverlay}/>

export default DatePickerInputText
