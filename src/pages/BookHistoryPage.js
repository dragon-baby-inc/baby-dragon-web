import React, { useState, useContext, useEffect } from "react"
import useLogMessages from '../hooks/useLogMessages'
import UserSummaryLabel from '../components/FormElements/UserSummaryLabel/userSummaryLabel'
import PaymentsHeader from '../components/PaymentsHeader/PaymentsHeader'
import useScrollInfo from 'react-element-scroll-hook';
import Loading from '../components/Loading/Loading'
import PageHeader from '../components/PageHeader/PageHeader'
import { faUsers } from '@fortawesome/fontawesome-free-solid'
import { themeColors } from '../constants/globalColors'
import EmptyResult from '../components/EmptyResult/EmptyResult'
import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';

const styles = {
  bg: {
    width: '100vw',
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'hidden',
  },
  logMessages: {
    padding: '20px',
    paddingBottom: '200px',
    overflow: 'auto',
    height: 'calc(100vh - 40px - 60px)',
  },
  createdAt: {
    minWidth: '52px',
    padding: '0px 4px'
  },
  text: {
    flexShrink: "1"
  },
  userName: {
    fontSize: '12px',
    paddingLeft: '5px',
    color: themeColors.gold500,
    display: "inline-block"
  },
  label: {
    display: "flex",
    alignItems: "center",
    padding: '10px 10px',
    lineHeight: '1.5rem',
    borderBottom: '1px solid #eeeeee',
    fontSize: '14px',
    color: themeColors.gold900,
  },
  dateSeparator: {
    fontSize: '12px',
    padding: '10px 0px 10px',
    textAlign: 'center',
    color: themeColors.gray600,
  }
}

const BookHistoryPage = ({
  users,
  accountingBookDetails
}) => {
  const [logMessages, loading] = useLogMessages()

  const calendar = {
    sameDay: '[今日]',
    lastDay: '[昨日]',
    sameElse: 'M/DD',
    nextWeek: 'M/DD',
    lastWeek: 'M/DD',
  }


  let currentDate = null
  let objects = []
  logMessages.forEach(object => {
    if (object.created_at != currentDate) {
      currentDate = object.created_at
      objects.push(
        <div key={currentDate} style={styles.dateSeparator}>{currentDate}</div>)
    }
    objects.push(
      <div key={object.id} style={styles.label}>
        <div style={styles.text}>
          {object.content}
          <span style={styles.userName}>
            - {object.user_name}
          </span>
        </div>
      </div>
    )
  })

  return(
    <div style={styles.bg}>
      <PageHeader title={'編輯歷史'} faIcon={faUsers} color={themeColors.gray400}/>
      {
        loading ?
          <Loading />
          :
          <div style={styles.logMessages}>
            {
              objects.length > 0 ? objects : <EmptyResult message='目前沒有任何歷史紀錄喔'/>
            }
          </div>
      }
    </div>
  )
}

export default BookHistoryPage
