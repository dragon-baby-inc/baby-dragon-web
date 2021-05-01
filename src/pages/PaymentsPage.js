import React, { useState, useContext, useEffect, useRef } from "react"
import { Context } from '../contexts/PaymentContext'
import { Context as AuthContext } from '../contexts/AuthContext'
import useAccountingBook from '../hooks/useAccountingBook'
import useAccountingBookSummary from '../hooks/useAccountingBookSummary'
import usePayments from '../hooks/usePayments'
import FloatIcon from '../components/FormElements/FloatIcon/FloatIcon'
import PaymentCheckboxLabel from '../components/FormElements/PaymentLabel/paymentCheckboxLabel'
import AccountingBookSummaryBoard from '../components/AccountingBookSummaryBoard/AccountingBookSummaryBoard'
import IconsList from '../components/FormElements/IconsList/IconsList'
import { themeColors } from '../constants/globalColors'
import useScrollInfo from 'react-element-scroll-hook';
import PaymentsHeader from '../components/PaymentsHeader/PaymentsHeader'
import Loading from '../components/Loading/Loading'
import EmptyResult from '../components/EmptyResult/EmptyResult'

const PaymentsPage = (props) => {
  const { state, setPayer } = useContext(Context)
  const [ editMode, setEditMode ] = useState(false)
  const { state: authState } = useContext(AuthContext)
  const [ small, setSmall ] = useState(false)
  const [users, accountingBookDetails] = useAccountingBook()
  const [summary] = useAccountingBookSummary()
  const [payments, paymentLoading] = usePayments()
  const [scrollInfo, setRef] = useScrollInfo();

  let currentDate = null
  let paymentLabels = []

  let paymentStyle =  {
    paddingTop: small ? '40px' : '20px',
    overflow: 'auto',
    height: 'calc(100vh - 40px - 60px)',
    paddingBottom: '100px',
  }

  payments.forEach(payment => {
    if (payment.created_at != currentDate) {
      currentDate = payment.created_at
      paymentLabels.push( <div style={styles.dateSeparator}>{currentDate}</div>)
      paymentLabels.push(<PaymentCheckboxLabel {...accountingBookDetails} key={payment.id} object={payment} editMode={editMode}/>)
    } else {
      paymentLabels.push(<PaymentCheckboxLabel {...accountingBookDetails} key={payment.id} object={payment} editMode={editMode}/>)
    }
  })

  const handleSmallChange = (small) => {
    setSmall(small)
  }

  return(
    <div style={styles.bg}>
      <PaymentsHeader scrollInfo={scrollInfo} accountingBookDetails={accountingBookDetails} handleSmallChange={handleSmallChange}/>
      {
        paymentLoading ?
          <div style={paymentStyle}>
            <Loading />
          </div>
          :
          <div style={paymentStyle} ref={setRef}>
            {
              payments.length > 0 ?
                paymentLabels : <EmptyResult message='目前沒有任何款項喔'/>
            }
          </div>
      }
    </div>
  )
}

const styles = {
  bg: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  h1: {
    padding: '12px',
    textAlign: 'center',
    fontSize: '1.5rem',
  },
  dateSeparator: {
    fontSize: '12px',
    textAlign: 'center',
  },
  addPayment: {
    right: '10px',
    bottom: '75px',
  }
}


//         <FloatIcon style={styles.addPayment} {...accountingBookDetails}/>
export default PaymentsPage
