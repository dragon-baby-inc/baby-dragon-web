import React, {useState, useEffect} from "react"
import PageHeader from '../PageHeader/PageHeader'
import styles from './PaymentsHeader.module.scss'
import { themeColors } from '../../constants/globalColors'
import TopLeftIcon from '../IconLinks/TopLeftIcon'
import TopRightIcon from '../IconLinks/TopRightIcon'
import FontAwesomeIcon from '../../utilities/FontAwesomeIcon'

function PaymentsHeader({ scrollInfo, accountingBookDetails, handleSmallChange, small }){
  if (scrollInfo) {
    if (scrollInfo.y.value > 50 && !small) {
      handleSmallChange(true)
    } else if (scrollInfo.y.value == 0 && small){
      handleSmallChange(false)
    }
  }

  let classes = [styles.header]
  let iconClasses = [styles.icon, styles.barsIcon]
  let nameClasses = [styles.name]
  let innerBlockClasses = [styles.innerBlock]
  if (small) {
    classes.push(styles.small)
    iconClasses.push(styles.small)
    nameClasses.push(styles.small)
    innerBlockClasses.push(styles.small)
  }

  return(
    <div className={classes.join(' ')}>
      <TopLeftIcon link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books`} color='white' faIcon='faArrowLeft'/>
      <TopRightIcon link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books`} color='white' faIcon='faBars'/>
      <div className={innerBlockClasses.join(" ")}>
        <FontAwesomeIcon className={styles.bookIcon} faIcon='faBookOpen' color={themeColors.gray400}/>
        <div>
          <div className={nameClasses.join(' ')}>
            {accountingBookDetails.name}
          </div>
          <div className={styles.details}>
            <div className={styles.user_count}>
              群組人數：{accountingBookDetails.users_size} 人
            </div>
            <div className={styles.user_count}>
              建立日期：{accountingBookDetails.created_at}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentsHeader
