import React, { useState } from "react"
import styles from './IconsList.module.scss'
import { themeColors } from '../../../constants/globalColors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/fontawesome-free-solid'
import { faFilter } from '@fortawesome/fontawesome-free-solid'
import { faClipboard } from '@fortawesome/fontawesome-free-solid'

const IconsList = (props) => {
  return(
    <div className={styles.bg}>
      <a href={`/liff_entry/groups/${props.group_id}/accounting_books/${props.id}/payments/new`} className={[styles.icon, styles.add].join(' ')}>
        <FontAwesomeIcon icon={faPlus} color={themeColors.white} className={styles.fa}/>
      </a>
      <div className={styles.icons}>
        <a className={styles.icon}>
          <FontAwesomeIcon icon={faFilter} color={themeColors.green900}/>
          <span>
            進階搜尋
          </span>
        </a>
        <a className={styles.icon}>
          <FontAwesomeIcon icon={faClipboard} color={themeColors.green900}/>
          <span>
            分帳建議
          </span>
        </a>
      </div>
    </div>
  )
}

export default IconsList
