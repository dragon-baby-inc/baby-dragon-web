import React, { useState, useContext } from "react"
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import useScrollInfo from 'react-element-scroll-hook';
import AccountingBookSummaryPage from '../pages/AccountingBookSummaryPage'
import { useHistory } from "react-router-dom";
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';
import { themeColors } from '../constants'
import { Context as AuthContext } from '../contexts/AuthContext'
import { usePayments, useAccountingBook } from '../hooks'
import {
  ConfirmBox,
  ColumnSwappableView,
  PaymentsHeader,
  Loading,
  EmptyResult,
  CircleFloatingIcon,
  Views,
  PaymentCheckboxLabel,
} from '../components'

const PaymentsPage = (props) => {
  const { url } = useRouteMatch();
  const history = useHistory();
  const [ editMode, setEditMode ] = useState(false)
  const [ selectedPaymentIds, setSelectedPaymentIds ] = useState([])
  const { state: authState } = useContext(AuthContext)
  const [ small, setSmall ] = useState(false)
  /* eslint-disable no-unused-vars */
  const [users, accountingBookDetails, accountingBookLoading] = useAccountingBook()
  const [payments, paymentLoading, getPayments] = usePayments('')
  const [scrollInfo, setRef] = useScrollInfo();
  const { group_id, accounting_book_id } = useParams();
  const [selectAll, setSelectAll] = useState(false)
  const [index, setIndex] = useState(0)

  let currentDate = null
  let paymentLabels = []

  let paymentHeight = small ? 'calc(100vh - 58px)' : 'calc(100vh - 58px - 120px)'
  let paymentsHeight = small ? 'calc(100vh - 58px)' : 'calc(100vh - 58px - 120px)'
  paymentsHeight = "calc(100% - 29px)"
  console.log(paymentsHeight)
  let paymentStyle =  {
    background: '#FFFFFF',
    overflow: 'auto',
    marginTop: small ? '0px' : '0px',
    height: paymentsHeight,
    paddingBottom: '150px'
  }

  const handleIndexChanged = (i) => {
    setIndex(i)
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

  const [deleteActive, seDeleteActive] = useState(null)

  let deleteConfirmBox = <ConfirmBox
    title="刪除帳款"
    confirmed={() => deletePayment(deleteActive)}
    canceled={() => { seDeleteActive(null) }}
    confirm_text="確認"
    cancel_text="取消">
    <div style={{ paddingBottom: '20px' }}> 確認刪除 {deleteActive ? deleteActive.description : null } 這筆帳款嗎? </div>
    </ConfirmBox>

  const deletePayment = (payment) => {
    axios.post(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}/payments/destroy_all`, {
      payment_ids: [payment.id],
      builder_id: authState.userLineIdToken
    }).then(function (response) {
      getPayments()
      seDeleteActive(null)
    })
      .catch(function (error) {
        console.log(error)
        alert('刪除失敗')
        seDeleteActive(null)
      })
  }

  const handleDeletePayment = (payment) =>{
    seDeleteActive(payment)
  }

  payments.forEach(payment => {
    if (payment.created_at !== currentDate) {
      currentDate = payment.created_at
      paymentLabels.push( <div key={currentDate} style={styles.dateSeparator}>{currentDate}</div>)
    }

    paymentLabels.push(
      <PaymentCheckboxLabel
        deleted={handleDeletePayment}
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

  const handleAddPayment = () => {
    history.push(`/liff_entry/groups/${group_id}/accounting_books/${accounting_book_id}/payments/new`)
  }

  const activeEditMode = () => { setEditMode(true); setSmall(true) }
  const deactiveEditMode = () => { setEditMode(false); setSmall(false);  }

  const steps = [
    {
      name: '帳目明細',
      component: <div style={paymentStyle} ref={setRef}>
          { payments.length > 0 ?  paymentLabels : <EmptyResult message='目前沒有任何款項喔'/> }
        </div>
    },
    {
      name: '分帳建議',
      component: <AccountingBookSummaryPage users={users} accountingBookDetails={accountingBookDetails}/>
    }
  ]


  return(
    <>
      <div style={styles.bg}>
        <PaymentsHeader
          loading={paymentLoading}
          deactiveEditMode={deactiveEditMode}
          editMode={editMode}
          activeEditMode={activeEditMode}
          selectAll={selectAll}
          paymentSize={payments.length}
          scrollInfo={scrollInfo}
          small={small}
          accountingBookDetails={accountingBookDetails}
          handleSmallChange={handleSmallChange}
        />

        {
          paymentLoading ? <div style={paymentStyle}><Loading /></div> :
            <ColumnSwappableView index={index} setIndex={handleIndexChanged} steps={steps} height={paymentsHeight}/>
        }
      </div>
      <CircleFloatingIcon
        faicon='faPlus'
        faColor={themeColors.white}
        clicked={handleAddPayment}
        iconInlineStyle={{background: 'none', background: 'linear-gradient(92.29deg, #103C2B 0%, #07694D 100%)'}}
        containerInlineStyle={{ right: '30px', bottom: '24px'}}/>
      { deleteActive ? deleteConfirmBox : null }
    </>
  )
}

const styles = {
  bg: {
    width: '100vw',
    height: 'calc(100vh)',
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
    fontSize: '14px',
    textAlign: 'left',
    paddingTop: '12px',
    paddingLeft: '16px',
    fontWeight: 700,
    color: themeColors.gray600,
  },
}


export default PaymentsPage


//         <Switch>
//           <>
//             {
//               (paymentLoading) ?
//                 <div style={paymentStyle}>
//                   <Loading />
//                 </div>
//                 :
//                 <div style={paymentStyle} ref={setRef}>
//                   <Route exact path={`/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/payments/index`}>
//                     {
//                       payments.length > 0 ?
//                         paymentLabels : <EmptyResult message='目前沒有任何款項喔'/>
//                     }
//                   </Route>
//                   <Route exact path={`/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/payments/summary`}>
//                     <>
//                       <AccountingBookSummaryPage users={users} accountingBookDetails={accountingBookDetails}/>
//                     </>
//                   </Route>
//                 </div>
//             }
//           </>
//         </Switch>
