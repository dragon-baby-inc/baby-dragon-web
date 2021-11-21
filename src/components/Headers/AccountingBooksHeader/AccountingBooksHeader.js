import React, {useState} from "react"
import styles from './AccountingBooksHeader.module.scss'
import { themeColors } from '../../../constants'
import PageHeader from '../PageHeader/PageHeader'
import { TopRightIcon } from '../../index'

function AccountingBooksHeader({ scrollInfo, group, setShowForm }){
  const [small, setSmall] = useState(false)

  if (scrollInfo) {
    if (scrollInfo.y.value > 50 && !small) {
      setSmall(true)
    } else if (scrollInfo.y.value === 0 && small){
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
    </>
  )
}

export default AccountingBooksHeader
