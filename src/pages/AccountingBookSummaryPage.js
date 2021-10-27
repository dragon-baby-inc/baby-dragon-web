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
    height: 'calc(100vh - 40px - 60px)',
  }
}

const AccountingBookSummaryPage = ({
  users,
  accountingBookDetails
}) => {
  const [summary, loading] = useAccountingBookSummary()

  let objects = summary.map(object => {
    return <UserSummaryLabel key={object.payer_id} object={object} accountingBookDetails={accountingBookDetails}></UserSummaryLabel>
  })

  return(
    <div style={styles.bg}>
      <PageHeader title={'分帳建議'} color={themeColors.gray400}/>
      <TopLeftIcon
        link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books`}
        color={themeColors.gold900}
        faicon='faHome'
        style={{fontSize: '20px'}}/>
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
