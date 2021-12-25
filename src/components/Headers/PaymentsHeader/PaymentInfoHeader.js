import React, { useState, useEffect } from "react"
import styles from './PaymentsHeader.module.scss'
import { DisclaimerBox, Image } from '../../index'

function PaymentsHeader({
  paymentSize,
  index,
  selectAll,
  handleSelectAllClick,
  editMode,
  discliamerClosedCallback,
  accountingBookDetails,
  loading
}){
  const [showDisclamier, setShowDisclaimer] = useState(false)

  useEffect(() => {
    if (accountingBookDetails.current !== undefined) {
      setShowDisclaimer(!accountingBookDetails.current)
    }
  }, [accountingBookDetails])

  const disclaimerClosed = () => {
    setShowDisclaimer(false)
    discliamerClosedCallback()
  }

  let classes = [styles.header]
  let innerBlockClasses = [styles.innerBlock]

  return(
    <div>
      <div className={classes.join(' ')}>
        {
          showDisclamier ?
            <DisclaimerBox closed={disclaimerClosed}>
              如需於聊天室中使用帳款指令請將此帳本設為預設
            </DisclaimerBox > : null
        }
        <div className={innerBlockClasses.join(" ")}>
          <div>
            <div>
              <Image defaultImage="accountingBook" imageUrl={accountingBookDetails.imageUrl} size='80px' circle/>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.count}>
              {loading ? "-" : accountingBookDetails.cover_cost_users_size}
            </div>
            <div className={styles.label}>
              分帳人數
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.count}>
              {loading ? "-" : paymentSize}
            </div>
            <div className={styles.label}>
              帳款數量
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default PaymentsHeader
