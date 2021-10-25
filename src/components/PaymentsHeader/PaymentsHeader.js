import React, {useState, useEffect} from "react"
import PageHeader from '../PageHeader/PageHeader'
import styles from './PaymentsHeader.module.scss'
import { themeColors } from '../../constants/globalColors'
import TopLeftIcon from '../IconLinks/TopLeftIcon'
import TopRightIcon from '../IconLinks/TopRightIcon'
import FontAwesomeIcon from '../../utilities/FontAwesomeIcon'
import Checkbox from '../FormElements/Inputs/Checkbox'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

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
  const [isSelectAll, setIsSelectAll] = useState(selectAll)

  if (scrollInfo && !editMode) {
    if (scrollInfo.y.value > 20 && !small) {
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
      {
        editMode ?
          <div onClick={handleSelectAllClick} style={inlineStyles.topLeft}>
            { selectAll ?
              <FontAwesomeIcon color={themeColors.gold900} faIcon='faCheckDouble'/>
              :
              <FontAwesomeIcon color={themeColors.gold900} faIcon='faCheckDouble'/>
            }
          </div>
          :
          null
      }
      <TopRightIcon style={{ right: 2 }} link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/payments/new`} color='black' faIcon='faPlus'/>
      {
        editMode ?
          <TopRightIcon clicked={deactiveEditMode} style={{ right: 38 }} color='gray' faIcon='faTimes'/>
          :
          <TopRightIcon clicked={activeEditMode} style={{ right: 38 }} color='black' faIcon='faTrash'/>
      }
      { small ?
          null :
      <TopLeftIcon link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books`} color='black' faIcon='faHome'/>
      }
      <div className={innerBlockClasses.join(" ")}>
        {
          small ?
            null : <FontAwesomeIcon className={styles.bookIcon} faIcon='faBookOpen' color={themeColors.gold900}/>
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
