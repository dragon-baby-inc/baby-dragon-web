import React, { useState } from "react"
import styles from './IconsList.module.scss'
import { NavLink } from 'react-router-dom';
import { themeColors } from '../../../constants/globalColors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/fontawesome-free-solid'
import { faClipboard } from '@fortawesome/fontawesome-free-solid'
import { faPlus } from '@fortawesome/fontawesome-free-solid'

const IconsList = (props) => {
  return(
    <div className={styles.bg}>
      <div className={styles.icons}>
        <a className={styles.icon}>
          <FontAwesomeIcon icon={faFilter} color={themeColors.gray900}/>
          <span>
            進階搜尋
          </span>
        </a>
        <NavLink
          className={styles.icon}
          to={`/liff_entry/groups/${props.group_id}/accounting_books/${props.id}/payments`}
        >
          <FontAwesomeIcon icon={faClipboard} color={themeColors.gray900}/>
          <span>
            帳款列表
          </span>
        </NavLink>
        <NavLink
          className={styles.icon}
          to={`/liff_entry/groups/${props.group_id}/accounting_books/${props.id}/summary`}
        >
          <FontAwesomeIcon icon={faClipboard} color={themeColors.gray900}/>
          <span>
            分帳建議
          </span>
        </NavLink>
        <a
          className={styles.icon}
          href={`/liff_entry/groups/${props.group_id}/accounting_books/${props.id}/payments/new`}
        >
          <FontAwesomeIcon icon={faPlus} color={themeColors.gray900}/>
          <span>
            新增帳款
          </span>
        </a>
      </div>
    </div>
  )
}

export default IconsList
