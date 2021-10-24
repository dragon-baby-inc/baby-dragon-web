import React, { useState, useEffect } from "react"
import styles from './IconsList.module.scss'
import { NavLink } from 'react-router-dom';
import { themeColors } from '../../../constants/globalColors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/fontawesome-free-solid'
import { faClipboard } from '@fortawesome/fontawesome-free-solid'
import { faList } from '@fortawesome/fontawesome-free-solid'
import { faHistory } from '@fortawesome/fontawesome-free-solid'
import { faBook } from '@fortawesome/fontawesome-free-solid'

const IconsList = (props) => {
  const [disabled, setDisabled] = useState(true)
  const links = [
    {
      href: `/liff_entry/groups/${props.group_id}/accounting_books`,
      faIcon: faBook,
      text: '帳本列表'
    },
    {
      href: `/liff_entry/groups/${props.group_id}/accounting_books/${props.id}/payments`,
      faIcon: faList,
      text: '帳款列表'
    },
    {
      href: `/liff_entry/groups/${props.group_id}/accounting_books/${props.id}/summary`,
      faIcon: faClipboard,
      text: '分帳建議'
    },
    {
      href: `/liff_entry/groups/${props.group_id}/accounting_books/${props.id}/log_messages`,
      faIcon: faHistory,
      text: '編輯歷史'
    },

  ]

  useEffect(() => {
    if (props.group_id) {
      setDisabled(false)
    }
  }, props.group_id)


  let disabledClass = disabled ? styles.disabled : ''
  let iconLinks = links.map(link => {
    return (
      <NavLink key={link.text} exact to={link.href} activeClassName={styles.activeStyle} className={[disabledClass, styles.icon].join(' ')} >
        {link.children}
        <FontAwesomeIcon icon={link.faIcon}/>
        <span> {link.text} </span>
      </NavLink>
    )
  })

  return(
    <div className={styles.bg}>
      <div className={styles.icons}>
        {iconLinks}
      </div>
    </div>
  )
}

export default IconsList
