import React, {useState} from "react"
import PageHeader from '../PageHeader/PageHeader'
import styles from './AccountingBooksHeader.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { themeColors } from '../../constants/globalColors'
import { faBars } from '@fortawesome/fontawesome-free-solid'
import { faUsers } from '@fortawesome/fontawesome-free-solid'

function AccountingBooksHeader({ scrollInfo, group }){
  const [small, setSmall] = useState(false)

  if (scrollInfo) {
    if (scrollInfo.y.value > 50 && !small) {
      setSmall(true)
    } else if (scrollInfo.y.value == 0 && small){
      setSmall(false)
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
      <div className={innerBlockClasses.join(" ")}>
        <FontAwesomeIcon className={styles.bookIcon} icon={faUsers} color={themeColors.gray400}/>
        <div>
          <div className={nameClasses.join(' ')}>
            {group.name}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountingBooksHeader
