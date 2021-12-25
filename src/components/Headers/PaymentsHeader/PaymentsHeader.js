import React, { useState, useEffect } from "react"
import styles from './PaymentsHeader.module.scss'
import { TopRightIcon } from '../../index'
import { PageHeader, Star } from '../../index'

function PaymentsHeader({
  paymentSize,
  index,
  selectAll,
  handleSelectAllClick,
  editMode,
  accountingBookDetails,
  handleSmallChange,
  loading
}){
  /* eslint-disable no-unused-vars */
  const [showDisclamier, setShowDisclaimer] = useState(false)

  useEffect(() => {
    if (accountingBookDetails.current !== undefined) {
      setShowDisclaimer(!accountingBookDetails.current)
    }
  }, [accountingBookDetails])

  const disclaimerClosed = () => {
    setShowDisclaimer(false)
  }

  let classes = [styles.header]
  let iconClasses = [styles.icon, styles.barsIcon]
  let nameClasses = [styles.name]
  let innerBlockClasses = [styles.innerBlock]

  return(
    <div>
      <PageHeader
        faicon='faChevronLeft'
        link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books`}
      >
        {accountingBookDetails.name}
        <Star solid={accountingBookDetails.current} style={{ paddingLeft: '4px', position: 'relative', bottom: '1px' }}/>

        <TopRightIcon
          style={{ fontSize: '20px', right: 58 }}
          link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/log_messages`}
          color={"black"}
          faicon='farFaClock'/>
        <TopRightIcon
          style={{ fontSize: '20px', right: 20 }}
          link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/settings`}
          color={"black"}
          faicon='faCog'/>
      </PageHeader>
    </div>
  )
}

export default PaymentsHeader
