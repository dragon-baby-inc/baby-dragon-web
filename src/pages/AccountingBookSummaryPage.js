import React, { useState, useContext, useEffect } from "react"
import useAccountingBookSummary from '../hooks/useAccountingBookSummary'
import UserSummaryLabel from '../components/FormElements/UserSummaryLabel/userSummaryLabel'

const styles = {
  bg: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
}

const AccountingBookSummaryPage = ({
  users,
  accountingBookDetails
}) => {
  const [summary] = useAccountingBookSummary()
  console.log(summary)
  let objects = summary.transactions.map(object => {
    return <UserSummaryLabel object={object} accountingBookDetails={accountingBookDetails}></UserSummaryLabel>
  })

  return(
    <div style={styles.bg}>
      {objects}
    </div>
  )
}

export default AccountingBookSummaryPage
