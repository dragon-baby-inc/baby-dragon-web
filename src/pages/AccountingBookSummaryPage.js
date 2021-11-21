import React from "react"
import { useAccountingBookSummary } from '../hooks'
import { PageHeader, TopLeftIcon, Loading, EmptyResult, UserSummaryLabel } from '../components'
import { themeColors } from '../constants'

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
    height: 'calc(100vh - 58px - 49px)',
  }
}

const AccountingBookSummaryPage = ({
  users,
  accountingBookDetails
}) => {
  const [summary, loading] = useAccountingBookSummary(accountingBookDetails.group_id, accountingBookDetails.id)

  let objects = summary.map(object => {
    return <UserSummaryLabel currency_symbol={accountingBookDetails.currency_symbol} key={object.payer_id} object={object} accountingBookDetails={accountingBookDetails}></UserSummaryLabel>
  })

  return(
    <div style={styles.bg}>
      {
        loading ?
          <Loading />
          :
          <div style={styles.summary}>
            { objects.length > 0 ?  objects : <EmptyResult message='目前沒有任何款項喔'/> }
          </div>
      }
    </div>
  )
}

export default AccountingBookSummaryPage
