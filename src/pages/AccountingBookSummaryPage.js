import React, { useState, useContext, useEffect } from "react"
import useAccountingBookSummary from '../hooks/useAccountingBookSummary'
import UserSummaryLabel from '../components/FormElements/UserSummaryLabel/userSummaryLabel'
import PageHeader from '../components/PageHeader/PageHeader'
import PaymentsHeader from '../components/PaymentsHeader/PaymentsHeader'
import useScrollInfo from 'react-element-scroll-hook';
import Loading from '../components/Loading/Loading'

const styles = {
  bg: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  summary: {
    paddingTop: '20px',
    overflow: 'auto',
    height: 'calc(100vh - 40px - 60px)',
    paddingBottom: '200px',
  }
}

const AccountingBookSummaryPage = ({
  users,
  accountingBookDetails
}) => {
  const [summary, loading] = useAccountingBookSummary()
  const [scrollInfo, setRef] = useScrollInfo();

  let objects = summary.map(object => {
    return <UserSummaryLabel key={object.payer_id} object={object} accountingBookDetails={accountingBookDetails}></UserSummaryLabel>
  })

  return(
    <div style={styles.bg}>
      {
        loading ?
          <Loading />
          :
         <div style={styles.summary}ref={setRef}> {objects} </div>
      }
    </div>
  )
}

export default AccountingBookSummaryPage
