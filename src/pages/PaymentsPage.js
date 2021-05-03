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
import { useParams } from 'react-router-dom';
import axios from '../api/dragonBabyApi'

const PaymentsPage = (props) => {
  const { state, setPayer } = useContext(Context)
  const [ editMode, setEditMode ] = useState(false)
  const [ selectedPaymentIds, setSelectedPaymentIds ] = useState([])
  const { state: authState } = useContext(AuthContext)
  const [ small, setSmall ] = useState(false)
  const [users, accountingBookDetails] = useAccountingBook()
  const [summary] = useAccountingBookSummary()
  const [filter, setFilter] = useState('')
  const [payments, paymentLoading, getPayments] = usePayments('')
  const [scrollInfo, setRef] = useScrollInfo();
  const { navigate } = useHistory();
  const { group_id, accounting_book_id } = useParams();
  const [selectAll, setSelectAll] = useState(false)

  let currentDate = null
  let paymentLabels = []

  let paymentStyle =  {
    background: '#FFFFFF',
    marginTop: small ? '58px' : '20px',
    paddingTop: small ? '10px' : '0px',
    overflow: 'auto',
    height: 'calc(100vh - 58px - 60px)',
    paddingBottom: '150px',
  }

  const handlePaymentChecked = (e) => {
    let paymentIds = selectedPaymentIds
    let value = e.target.value.toString()

    if (e.target.checked && !paymentIds.includes(value)) {
      paymentIds.push(e.target.value.toString())
    } else {
      paymentIds = paymentIds.filter(p => p !== value)
    }
    setSelectedPaymentIds(paymentIds)
  }

  payments.forEach(payment => {
    let checked = selectedPaymentIds.includes(payment.id.toString())
    if (payment.created_at != currentDate) {
      currentDate = payment.created_at
      paymentLabels.push( <div key={currentDate} style={styles.dateSeparator}>{currentDate}</div>)
    }

    paymentLabels.push(
      <PaymentCheckboxLabel
        selectedPaymentIds={selectedPaymentIds}
        changed={handlePaymentChecked}
        key={payment.id}
        object={payment}
        editMode={editMode}
        {...accountingBookDetails}
      />)
  })

  const handleSmallChange = (small) => {
    setSmall(small)
  }

  const activeEditMode = () => { setEditMode(true); setSmall(true) }
  const deactiveEditMode = () => { setEditMode(false); setSmall(false);  }

  const handleDeletePayment = () => {
    if (selectedPaymentIds.length === 0) { return }
    if (window.confirm(`確認刪除 ${selectedPaymentIds.length} 筆帳款?`)) {
      axios.post(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}/payments/destroy_all`, {
        payment_ids: selectedPaymentIds,
        builder_id: authState.userLineIdToken
      }).then(function (response) {
        getPayments()
        deactiveEditMode()
      })
        .catch(function (error) {
          console.log(error)
          alert('刪除失敗')
        })
    }
  }

  const handleSelectAllClick = (e) => {
    setSelectAll(!selectAll)
    if (!selectAll === true) {
      setSelectedPaymentIds(payments.map(p => p.id.toString()))
    } else {
      setSelectedPaymentIds([])
    }
  }

  return(
    <>
      <div style={styles.bg}>
        <PaymentsHeader
          selectAll={selectAll}
          handleSelectAllClick={handleSelectAllClick}
          editMode={editMode}
          scrollInfo={scrollInfo}
          small={small}
          accountingBookDetails={accountingBookDetails}
          handleSmallChange={handleSmallChange}
        />

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
              containerInlineStyle={{ right: '100px', bottom: '80px'}}/>
            <CircleFloatingIcon
              faIcon='faTrash'
              faColor={themeColors.white}
              clicked={handleDeletePayment}
              iconInlineStyle={{background: 'none', backgroundColor: 'red'}}
              containerInlineStyle={{ right: '30px', bottom: '80px'}}/>
          </>
          :
          <>
            <CircleFloatingIcon
              clicked={() => navigate(`/liff_entry/groups/${group_id}/accounting_books/${accounting_book_id}/payments/new`)}
              iconInlineStyle={{background: 'linear-gradient(90deg, rgba(16,60,43,1) 0%, rgba(7,105,77,1) 100%)', opacity: '0.95'}}
              faIcon='faPlus'
              faColor={themeColors.white}
              containerInlineStyle={{ right: '30px', bottom: '80px'}}/>
            <CircleFloatingIcon
              clicked={activeEditMode}
              iconInlineStyle={{background: 'linear-gradient(90deg, rgba(16,60,43,1) 0%, rgba(7,105,77,1) 100%)', opacity: '0.95'}}
              faIcon='faEdit'
              faColor={themeColors.white}
              containerInlineStyle={{ right: '100px', bottom: '80px'}}/>
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
