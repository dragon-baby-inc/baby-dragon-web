import React from "react"
import styles from './PaymentsHeader.module.scss'
import { themeColors } from '../../../constants'
import { TopLeftIcon, TopRightIcon } from '../../index'
import { FontAwesomeIcon } from '../../index'

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
  activeEditMode,
  selectAll,
  handleSelectAllClick,
  editMode,
  scrollInfo,
  accountingBookDetails,
  handleSmallChange,
  small
}){

  if (scrollInfo && !editMode) {
    if (scrollInfo.y.value > 20 && !small) {
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
    <div className={classes.join(' ')}>
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
      <TopRightIcon style={{ fontSize: '20px', right: 2 }} link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/payments/new`} color={themeColors.gold900} faicon='faPlus'/>
      {
        editMode ?
          <TopRightIcon clicked={deactiveEditMode} style={{ fontSize: '20px', right: 40 }} color='gray' faicon='faTimes'/>
          :
          <TopRightIcon clicked={activeEditMode} style={{ fontSize: '18px', right: 40, top: 1 }} color={themeColors.gold900} faicon='faTrash'/>
      }
      { small ?
          null :
          <TopLeftIcon link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books`} color={themeColors.gold900} faicon='faHome' style={{fontSize: '20px'}}/>
      }
      <div className={innerBlockClasses.join(" ")}>
        {
          small ?
            null : <FontAwesomeIcon className={styles.bookIcon} faicon='faBookOpen' color={themeColors.gold900}/>
        }
        <div className={styles.textBlock}>
          <div>
            <div className={nameClasses.join(' ')}>
              {accountingBookDetails.name}
            </div>
            <div className={styles.details}>
              <div className={styles.user_count}>
                群組人數：{accountingBookDetails.users_size} 人
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentsHeader
