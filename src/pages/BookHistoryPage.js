import React, { useContext } from "react"
import { useHistory, useLogMessages } from '../hooks'
import { Context as AuthContext } from '../contexts/AuthContext'
import { useParams } from 'react-router-dom';
import {
  Separater,
  PageHeader,
  Loading,
  EmptyResult,
  LogMessageLabel
} from '../components'
import { themeColors } from '../constants'

const styles = {
  category: {
    padding: '0px 0px',
    paddingRight: "8px",
    marginRight: "8px",
    borderRight: '1px solid #eeeeee',
    minWidth: '40px',
    lineHeight: '1.2rem',
    width: '40px'
  },
  bg: {
    width: '100vw',
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'hidden',
  },
  logMessages: {
    padding: '0px 20px',
    overflow: 'auto',
    height: 'calc(100vh - 58px)',
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

const BookHistoryPage = () => {
  const { state: authState } = useContext(AuthContext)
  const [logMessages, loading] = useLogMessages(authState)
  const { group_id, accounting_book_id } = useParams();
  const { routes } = useHistory();

  let currentDate = null
  let objects = []
  logMessages.forEach(object => {
    if (object.created_at !== currentDate) {
      currentDate = object.created_at
//       objects.push(
//         <div key={currentDate} style={styles.dateSeparator}>{currentDate}</div>)
    }
    objects.push(
      <LogMessageLabel object={object}/>
    )
  })

  return(
    <div style={styles.bg}>
      <PageHeader
        faicon='faChevronLeft'
        link={routes.paymentIndexPage({ group_id, accounting_book_id })}
        color={themeColors.black}>
        編輯歷史
      </PageHeader>
      <Separater style={{ margin: "0px" }}/>
      {
        loading ?
          <Loading />
          :
          <div style={styles.logMessages}>
            { objects.length > 0 ? objects : <EmptyResult message='目前沒有任何歷史紀錄喔'/> }
          </div>
      }
    </div>
  )
}

export default BookHistoryPage
