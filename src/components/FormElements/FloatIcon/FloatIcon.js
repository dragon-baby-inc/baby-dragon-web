import React from "react"
import styles from './FloatIcon.module.scss'
import { themeColors } from '../../../constants/globalColors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/fontawesome-free-solid'

const IconsList = (props) => {
  return(
    <a
      style={props.style}
      href={`/liff_entry/groups/${props.group_id}/accounting_books/${props.id}/payments/new`}
      className={[styles.icon, styles.add].join(' ')} >
      <FontAwesomeIcon icon={faPlus} color={themeColors.white} className={styles.fa}/>
    </a>
  )
}

export default IconsList
