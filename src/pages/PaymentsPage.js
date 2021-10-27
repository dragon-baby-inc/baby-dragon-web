import React, { useState, useContext } from "react"
import useScrollInfo from 'react-element-scroll-hook';
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';
import { themeColors } from '../constants'
import { Context as AuthContext } from '../contexts/AuthContext'
import { usePayments, useAccountingBook } from '../hooks'
import {
  PaymentsHeader,
  Loading,
  EmptyResult,
  CircleFloatingIcon,
  PaymentCheckboxLabel,
} from '../components'

const PaymentsPage = (props) => {
  const [ editMode, setEditMode ] = useState(false)
  const [ selectedPaymentIds, setSelectedPaymentIds ] = useState([])
  const { state: authState } = useContext(AuthContext)
  const [ small, setSmall ] = useState(false)
  const [users, accountingBookDetails] = useAccountingBook()
  const [payments, paymentLoading, getPayments] = usePayments('')
  const [scrollInfo, setRef] = useScrollInfo();
  const { group_id, accounting_book_id } = useParams();
  const [selectAll, setSelectAll] = useState(false)

  let currentDate = null
  let paymentLabels = []

  let paymentStyle =  {
    background: '#FFFFFF',
    overflow: 'auto',
    marginTop: small ? '56px' : '150px',
    height: 'calc(100vh - 58px - 60px)',
    paddingBottom: '150px',
  }
  //     marginTop: small ? '58px' : '20px',
  //     paddingTop: small ? '10px' : '0px',

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
    if (payment.created_at !== currentDate) {
      currentDate = payment.created_at
      paymentLabels.push( <div key={currentDate} style={styles.dateSeparator}>{currentDate}</div>)
    }

    console.log(payment.id)
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
          deactiveEditMode={deactiveEditMode}
          editMode={editMode}
          activeEditMode={activeEditMode}
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
              faIcon='faTrash'
              faColor={themeColors.white}
              clicked={handleDeletePayment}
              iconInlineStyle={{background: 'none', backgroundColor: 'red'}}
              containerInlineStyle={{ right: '30px', bottom: '80px'}}/>
          </>
          :
          <>
            null
          </>
      }
    </>
  )
}

const styles = {
  bg: {
    width: '100vw',
    height: 'calc(100vh - 60px)',
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
    padding: '5px',
    color: themeColors.gray600,
  },
}


export default PaymentsPage
