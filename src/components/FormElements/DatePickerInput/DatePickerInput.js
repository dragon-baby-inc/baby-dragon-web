import React, { useState, useEffect } from "react"
import styles from './DatePickerInput.module.scss'
import { themeColors } from '../../../constants/globalColors'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import '../DatePickerMenu/DatePickerStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/fontawesome-free-solid'
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import 'moment/locale/zh-tw';

const DatePickerOverlay = ({ classNames, selectedDay, children, ...props  }) => {
  return (
    <div style={{ position: "absolute", bottom: '-5px', marginLeft: -100 }} {...props} >
      <div className={classNames.overlay}>
        {children}
      </div>
    </div>
  );
}

const DatePickerInputText = ({
  name,
  labelStyle,
  changed,
  value,
  placeholder,
  valid,
}) => {

  const [focus, setFocus] = useState(false)
  const [selectedDay, setSelectedDay] = useState(new Date());
  console.log(moment().format())

  useEffect(() => {
    if (!value) { changed(moment().format()) }
  }, [])

  const labelStyles = [styles.label]
  if (focus) { labelStyles.push(styles.focus) }
  if (valid == false) { labelStyles.push(styles.invalid) }
  let displayValue = value ? value : moment().format()

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
        value={value}
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
