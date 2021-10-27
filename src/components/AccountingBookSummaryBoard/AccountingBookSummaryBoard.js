import React from "react"
import styles from './AccountingBookSummaryBoard.module.scss'
import UserSummaryLabel from '../FormElements/UserSummaryLabel/userSummaryLabel'

const AccountingBookSummaryBoard = (props) => {
  let settlements = []
  let settleGroups = {}
  const objects = []

  if (props.settlements.length > 0) {
    settlements = props.settlements
    settlements.forEach(s => {
      if (!settleGroups[s.payer_id]) {
        settleGroups[s.payer_id] = []
      }
      settleGroups[s.payer_id].push(s)
    })

    if (settleGroups && Object.keys(settleGroups).length > 0) {
      Object.keys(settleGroups).forEach(key => {
        objects.push(
          <UserSummaryLabel {...props.accountingBookDetails} key={key} objects={settleGroups[key]} object={settleGroups[key].first}/>
        )
      })
    }
  }

  return(
    <div className={styles.bg}>
      {objects}
    </div>
  )
}

export default AccountingBookSummaryBoard
