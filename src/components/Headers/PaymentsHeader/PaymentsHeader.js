import React from "react"
import styles from './PaymentsHeader.module.scss'
import { themeColors } from '../../../constants'
import { TopLeftIcon, TopRightIcon } from '../../index'
import { PageHeader, FontAwesomeIcon, Image, Star } from '../../index'

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
  activeEditMode,
  selectAll,
  handleSelectAllClick,
  editMode,
  scrollInfo,
  accountingBookDetails,
  handleSmallChange,
  small,
  loading
}){

  if (scrollInfo && !editMode) {
    if (scrollInfo.y.value > 10 && !small) {
      handleSmallChange(true)
    } else if (scrollInfo.y.value === 0 && small){
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
    <div>
      <PageHeader
        faicon='faChevronLeft'
        link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books`}
      >
        {accountingBookDetails.name}
        <Star solid/>

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
        <div className={innerBlockClasses.join(" ")}>
          <div>
            {
              small ?
                null : <Image defaultImage="accountingBook" imageUrl={accountingBookDetails.imageUrl} size='80px' circle/>
            }
          </div>
          <div className={styles.info}>
            <div className={styles.count}>
              {loading ? "-" : accountingBookDetails.users_size}
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
