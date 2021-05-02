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
import CircleFloatingIcon from '../components/IconLinks/CircleFloatingIcon/CircleFloatingIcon'
import useHistory from '../hooks/useHistory'

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
  const [navigate] = useHistory();

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

  const activeEditMode = () => { setEditMode(true); setSmall(true) }
  const deactiveEditMode = () => { setEditMode(false); setSmall(false) }

  return(
    <>
      <div style={styles.bg}>
        <PaymentsHeader scrollInfo={scrollInfo} small={small} accountingBookDetails={accountingBookDetails} handleSmallChange={handleSmallChange}/>

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
      {
        editMode ?
          <>
            <CircleFloatingIcon
              clicked={deactiveEditMode}
              faIcon='faTimes'
              faColor={themeColors.gray600}
              iconInlineStyle={{background: 'none', opacity: '0.95', backgroundColor: '#ffffff'}}
              containerInlineStyle={{ right: '90px', bottom: '80px'}}/>
            <CircleFloatingIcon
              faIcon='faTrash'
              faColor={themeColors.white}
              iconInlineStyle={{background: 'none', backgroundColor: 'red'}}
              containerInlineStyle={{ right: '30px', bottom: '80px'}}/>
          </>
          :
          <>
            <CircleFloatingIcon
              clicked={navigate(`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/payments/new`)}
              iconInlineStyle={{background: 'linear-gradient(90deg, rgba(16,60,43,1) 0%, rgba(7,105,77,1) 100%)', opacity: '0.95'}}
              faIcon='faPlus'
              faColor={themeColors.white}
              containerInlineStyle={{ right: '30px', bottom: '80px'}}/>
            <CircleFloatingIcon
              clicked={activeEditMode}
              iconInlineStyle={{background: 'linear-gradient(90deg, rgba(16,60,43,1) 0%, rgba(7,105,77,1) 100%)', opacity: '0.95'}}
              faIcon='faEdit'
              faColor={themeColors.white}
              containerInlineStyle={{ right: '90px', bottom: '80px'}}/>
          </>
      }
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
