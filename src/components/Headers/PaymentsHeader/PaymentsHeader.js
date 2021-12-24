import React, { useState, useEffect } from "react"
import styles from './PaymentsHeader.module.scss'
import { themeColors } from '../../../constants'
import { TopLeftIcon, TopRightIcon } from '../../index'
import { DisclaimerBox, PageHeader, FontAwesomeIcon, Image, Star } from '../../index'

const inlineStyles = {
  topLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    color: 'white',
    textDecoration: "none",
    padding: '20px',
  }
}

function PaymentsHeader({
  deactiveEditMode,
  paymentSize,
  summaryHeight,
  paymentHeight,
  summaryScrollInfo,
  activeEditMode,
  index,
  selectAll,
  handleSelectAllClick,
  editMode,
  scrollInfo,
  accountingBookDetails,
  handleSmallChange,
  small,
  loading
}){
  let timer = null

  if (index === 0 && paymentHeight > 250) {
    if (scrollInfo && !editMode) {
      if (scrollInfo.y.value > 10 && !small) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          handleSmallChange(true)
        }, 10)
      } else if (scrollInfo.y.value === 0 && small){
        clearTimeout(timer)
        timer = setTimeout(() => {
          handleSmallChange(false)
        }, 10)
      }
    }
  }

  let lastSummaryY
  if (index === 1) {
    if (summaryScrollInfo && !editMode) {
      if (summaryScrollInfo.y.value > 10 && !small) {
        lastSummaryY = summaryScrollInfo.y.value
        clearTimeout(timer)
        timer = setTimeout(() => {
          handleSmallChange(true)
        }, 10)
      } else if (summaryScrollInfo.y.value === 0 && summaryScrollInfo !== 0 && small){
        lastSummaryY = summaryScrollInfo.y.value
        clearTimeout(timer)
        timer = setTimeout(() => {
          handleSmallChange(false)
        }, 100)
      }
    }
  }

  const [showDisclamier, setShowDisclaimer] = useState(false)

  useEffect(() => {
    if (accountingBookDetails.current !== undefined) {
      setShowDisclaimer(!accountingBookDetails.current)
    }
  }, [accountingBookDetails])

  const disclaimerClosed = () => {
    setShowDisclaimer(false)
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
    <div>
      <PageHeader
        faicon='faChevronLeft'
        link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books`}
      >
        {accountingBookDetails.name}
        <Star solid={accountingBookDetails.current} style={{ paddingLeft: '4px', position: 'relative', bottom: '1px' }}/>

        {
          editMode ?
            <div onClick={handleSelectAllClick} style={inlineStyles.topLeft}>
              { selectAll ?
                <FontAwesomeIcon style={{ fontSize: '20px' }} color={themeColors.gold900} faicon='faCheckDouble'/>
                :
                <FontAwesomeIcon style={{ fontSize: '20px' }} color={themeColors.gold900} faicon='faCheckDouble'/>
              }
            </div>
            :
            null
        }
        <TopRightIcon
          style={{ fontSize: '20px', right: 58 }}
          link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/log_messages`}
          color={"black"}
          faicon='farFaClock'/>
        <TopRightIcon
          style={{ fontSize: '20px', right: 20 }}
          link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/settings`}
          color={"black"}
          faicon='faCog'/>
        {
          editMode ?
            <TopRightIcon clicked={deactiveEditMode} style={{ fontSize: '20px', right: 40 }} color='gray' faicon='faTimes'/>
            :
            null
        }
      </PageHeader>

      <div className={classes.join(' ')}>
        {
          showDisclamier ?
            <DisclaimerBox closed={disclaimerClosed}>
              如需於聊天室中使用帳款指令請將此帳本設為預設
            </DisclaimerBox > : null
        }
        <div className={innerBlockClasses.join(" ")}>
          <div>
            {
              small ?
                null :
                <>
                  <div>
                    <Image defaultImage="accountingBook" imageUrl={accountingBookDetails.imageUrl} size='80px' circle/>
                  </div>
                </>
            }
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

// <TopRightIcon clicked={activeEditMode} style={{ fontSize: '18px', right: 40, top: 1 }} color={themeColors.gold900} faicon='faTrash'/>

export default PaymentsHeader
