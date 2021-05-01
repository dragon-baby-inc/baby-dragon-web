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
import FilterPaymentForm from '../components/Forms/FilterForm/FilterPaymentForm'
import Backdrop from '../components/Backdrop/Backdrop'
import FloatingIcon from '../components/IconLinks/FloatingIcon/FloatingIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/fontawesome-free-solid'
import PaymentCreateFloatingIcon from '../components/IconLinks/PaymentCreateFloatingIcon'

const PaymentsPage = (props) => {
  const { state, setPayer } = useContext(Context)
  const [ editMode, setEditMode ] = useState(false)
  const { state: authState } = useContext(AuthContext)
  const [ small, setSmall ] = useState(false)
  const [users, accountingBookDetails] = useAccountingBook()
  const [summary] = useAccountingBookSummary()
  const [filter, setFilter] = useState('')
  const [payments, paymentLoading] = usePayments('')
  const [scrollInfo, setRef] = useScrollInfo();

  let currentDate = null
  let paymentLabels = []

  let paymentStyle =  {
    background: '#FFFFFF',
    marginTop: small ? '58px' : '20px',
    overflow: 'auto',
    height: 'calc(100vh - 58px - 60px)',
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
    <>
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
      <PaymentCreateFloatingIcon scrollInfo={scrollInfo} accountingBookDetails={accountingBookDetails}/>
    </>
  )
}

const styles = {
  bg: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    maxHeight: '-webkit-fill-available',
    position: 'relative',
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
}


export default PaymentsPage
