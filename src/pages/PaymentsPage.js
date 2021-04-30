import React, { useState, useContext, useEffect } from "react"
import { Context } from '../contexts/PaymentContext'
import { Context as AuthContext } from '../contexts/AuthContext'
import useAccountingBook from '../hooks/useAccountingBook'
import usePayments from '../hooks/usePayments'
import PaymentCheckboxLabel from '../components/FormElements/PaymentLabel/paymentCheckboxLabel'
import AccountingBookSummaryBoard from '../components/AccountingBookSummaryBoard/AccountingBookSummaryBoard'
import IconsList from '../components/FormElements/IconsList/IconsList'
import { themeColors } from '../constants/globalColors'

const styles = {
  bg: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  payments: {
    paddingTop: '8px',
    overflow: 'auto',
    height: 'calc(100vh - 60px - 60px)',
  },
  dateSeparator: {
    fontSize: '12px',
    textAlign: 'center',
    color: themeColors.gold900,
  }
}

const PaymentsPage = (props) => {
  const { state, setPayer } = useContext(Context)
  const [ editMode, setEditMode ] = useState(false)
  const { state: authState } = useContext(AuthContext)
  const [users, accountingBookDetails] = useAccountingBook()
  const [payments] = usePayments()

  let currentDate = null
  let paymentLabels = []

  payments.forEach(payment => {
    if (payment.created_at != currentDate) {
      currentDate = payment.created_at
      paymentLabels.push( <div style={styles.dateSeparator}>{currentDate}</div>)
      paymentLabels.push(<PaymentCheckboxLabel key={payment.id} object={payment} editMode={editMode}/>)
    } else {
      paymentLabels.push(<PaymentCheckboxLabel key={payment.id} object={payment} editMode={editMode}/>)
    }
  })

  return(
    <div style={styles.bg}>
      <AccountingBookSummaryBoard {...accountingBookDetails}/>
      <div style={styles.payments}>
        {paymentLabels}
      </div>
      <IconsList {...accountingBookDetails}/>
    </div>
  )
}

export default PaymentsPage
