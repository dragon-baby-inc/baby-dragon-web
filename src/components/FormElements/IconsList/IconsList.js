import React, { useState, useEffect } from "react"
import styles from './IconsList.module.scss'
import { NavLink } from 'react-router-dom';
import { themeColors } from '../../../constants/globalColors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/fontawesome-free-solid'
import { faClipboard } from '@fortawesome/fontawesome-free-solid'
import { faList } from '@fortawesome/fontawesome-free-solid'
import { faPlus } from '@fortawesome/fontawesome-free-solid'
import { faBook } from '@fortawesome/fontawesome-free-solid'

const IconsList = (props) => {
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (props.group_id) {
      setDisabled(false)
    }
  }, props.group_id)


  let disabledClass = disabled ? styles.disabled : ''

  return(
    <div className={styles.bg}>
      <div className={styles.icons}>
        <NavLink
          to={`/liff_entry/groups/${props.group_id}/accounting_books`}
          className={[disabledClass, styles.icon].join(' ')}
        >
          <FontAwesomeIcon icon={faBook} color={themeColors.gray900}/>
          <span>
            切換帳本
          </span>
        </NavLink>
        <NavLink
          className={[disabledClass, styles.icon].join(' ')}
          to={`/liff_entry/groups/${props.group_id}/accounting_books/${props.id}/payments`}
        >
          <FontAwesomeIcon icon={faList} color={themeColors.gray900}/>
          <span>
            帳款列表
          </span>
        </NavLink>
        <NavLink
          className={[disabledClass, styles.icon].join(' ')}
          to={`/liff_entry/groups/${props.group_id}/accounting_books/${props.id}/summary`} >
          <FontAwesomeIcon icon={faClipboard} color={themeColors.gray900}/>
          <span>
            分帳建議
          </span>
        </NavLink>
        <a
          className={[disabledClass, styles.icon].join(' ')}
          href={`/liff_entry/groups/${props.group_id}/accounting_books/${props.id}/payments/new`} >
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
