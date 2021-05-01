import React, { useState, useContext, useEffect } from "react"
import useAccountingBookSummary from '../hooks/useAccountingBookSummary'
import UserSummaryLabel from '../components/FormElements/UserSummaryLabel/userSummaryLabel'
import PaymentsHeader from '../components/PaymentsHeader/PaymentsHeader'
import useScrollInfo from 'react-element-scroll-hook';
import Loading from '../components/Loading/Loading'
import PageHeader from '../components/PageHeader/PageHeader'
import { faUsers } from '@fortawesome/fontawesome-free-solid'
import { themeColors } from '../constants/globalColors'
import EmptyResult from '../components/EmptyResult/EmptyResult'

const styles = {
  bg: {
    width: '100vw',
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'hidden',
  },
  summary: {
    paddingTop: '10px',
    paddingBottom: '200px',
    overflow: 'auto',
    height: 'calc(100vh - 40px - 60px)',
  }
}

const BookHistoryPage = ({
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
      <PageHeader title={'編輯歷史'} faIcon={faUsers} color={themeColors.gray400}/>
      {
        loading ?
          <Loading />
          :
          <EmptyResult message='目前沒有任何歷史紀錄喔'/>
      }
    </div>
  )
}

export default BookHistoryPage
