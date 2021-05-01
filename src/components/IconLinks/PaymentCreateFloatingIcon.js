import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/fontawesome-free-solid'
import { themeColors } from '../../constants/globalColors'
import FloatingIcon from './FloatingIcon/FloatingIcon'
import styles from './AddPaymentIcon.module.scss'

function AddPaymentIcon({ scrollInfo, accountingBookDetails }){
  const [active, setActive] = useState(true)

    console.log(scrollInfo)
  if (scrollInfo) {
    if (scrollInfo.y.className === 'scroll-bottom' && active) {
      setActive(false)
    } else if (scrollInfo.y.className !== 'scroll-bottom' && !active) {
      setActive(true)
    }
  }

  let iconClasses = [styles.addPaymentIcon]
  let avatarClasses = [styles.avatar]

  if (active) {
    iconClasses.push(styles.active)
    avatarClasses.push(styles.active)
  }

  return(
    <FloatingIcon
      link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/payments/new`}
      containerStyle={styles.floatingIcon}
      avatarStyle={avatarClasses.join(' ')}
    >
      <div className={iconClasses.join(' ')}  >
        <FontAwesomeIcon icon={faPlus} color={themeColors.white}/>
      </div>
    </FloatingIcon >
  )
}

export default AddPaymentIcon;
