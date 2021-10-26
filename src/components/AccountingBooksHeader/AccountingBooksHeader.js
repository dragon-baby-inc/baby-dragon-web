import React, {useState} from "react"
import styles from './AccountingBooksHeader.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { themeColors } from '../../constants/globalColors'
import { faUsers } from '@fortawesome/fontawesome-free-solid'
import PageHeader from '../../components/PageHeader/PageHeader'
import TopRightIcon from '../../components/IconLinks/TopRightIcon'

function AccountingBooksHeader({ scrollInfo, group, setShowForm }){
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
    <>
      <PageHeader title={'所有帳本'} color={themeColors.gray400}/>
      <TopRightIcon clicked={() => setShowForm(true)} color={themeColors.gold900} faIcon='faPlus' style={{fontSize: '20px', right: 2}}/>
    </>
  )
}

export default AccountingBooksHeader
