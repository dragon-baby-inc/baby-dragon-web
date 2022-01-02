import React, { useCallback, useRef, useEffect, useState, useContext } from "react"
import { useRouteMatch  } from 'react-router-dom';
import AccountingBookSummaryPage from '../pages/AccountingBookSummaryPage'
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { themeColors } from '../constants'
import { Context as AuthContext } from '../contexts/AuthContext'
import { useScrollRef, usePayments, useAccountingBook, useAccountingBookSummary } from '../hooks'

import {
  Svg,
  PaymentInfoHeader,
  UserSummaryLabel,
  ConfirmBox,
  ColumnSwappableView,
  PaymentsHeader,
  Loading,
  EmptyResult,
  CircleFloatingIcon,
  PaymentCheckboxLabel,
} from '../components'

const PaymentsPage = (props) => {
  const history = useHistory();
  /* eslint-disable no-unused-vars */
  const [ editMode, setEditMode ] = useState(false)
  const [ selectedPaymentIds, setSelectedPaymentIds ] = useState([])
  const { state: authState } = useContext(AuthContext)
  /* eslint-disable no-unused-vars */
  const [ small, setSmall ] = useState(false)
  /* eslint-disable no-unused-vars */
  const [users, accountingBookDetails, accountingBookLoading] = useAccountingBook(authState)
  const [payments, paymentLoading, getPayments] = usePayments(authState, '')
  const { group_id, accounting_book_id } = useParams();
  const [selectAll, setSelectAll] = useState(false)
  /* eslint-disable no-unused-vars */
  const [summary, loading, err, getAccountingBook] = useAccountingBookSummary(authState)
  const [index, setIndex] = useState(0)

  const [paymentsScrollInfo, paymentsDir, paymentsRef] = useScrollRef()
  const [paymentContainerScrollInfo, paymentContainerDir, paymentContainerRef] = useScrollRef()

//   const paymentContainerRef = useRef();
  const summaryRef = useRef();
//   const [paymentContainerScrollInfo, setPaymentContainerScrollInfo] = useState({ x: { value: 0 }, y: { value: 0 } })
  const [headerContainerHeight, setHeaderContainerHeight] = useState(120)

  useEffect(() => {
    if (accountingBookDetails.current !== undefined) {
      setHeaderContainerHeight(accountingBookDetails.current ? 120 : 175)
    }
  }, [accountingBookDetails])


  const discliamerClosedCallback = () => {
    setHeaderContainerHeight(120)
  }

  const handleScroll = useCallback((e, set) => {
    set({ x: { value: e.target.scrollLeft }, y: { value: e.target.scrollTop } })
  }, []);

//   useEffect(() => {
//     const div = paymentContainerRef.current
//     if (div) {
//       div.addEventListener('scroll', (e) => handleScroll(e, setPaymentContainerScrollInfo));
//     }
//   }, [paymentContainerRef.current]);

  let currentDate = null
  let paymentLabels = []

//   console.log(paymentContainerDir.y)
//   console.log(paymentContainerScrollInfo.y.value)
//   console.log('-')
//   console.log('paymentContainerScrollInfo: '+ paymentContainerScrollInfo.y.value)
//   console.log('paymentsScrollInfo:' + paymentsScrollInfo.y.value)
//   console.log('paymentsDirY: ' + paymentsDir.y)
//   console.log('paymentContainerDirY: ' + paymentContainerDir.y)
  const [paymentOverflow, setPaymentOverflow] = useState('hidden')

  if (paymentContainerScrollInfo.y.value > (headerContainerHeight - 25) && paymentOverflow !== 'auto') {
    setPaymentOverflow('auto')
    paymentsRef.current.scroll(0, 5)
  }

  let paymentsHeight = "calc(100%)"
  let paymentStyle =  {
    background: '#FFFFFF',
    overflow: paymentOverflow,
    marginTop: small ? '0px' : '1px',
    flexGrow: 1,
    height: paymentsHeight,
    paddingBottom: '260px'
  }

  let paymentContainerStyle = {
    overflow: 'auto',
  }

  const handleIndexChanged = (i) => {
    setIndex(i)
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
    authState.api.deletePayments(group_id, accounting_book_id, {
      payment_ids: [payment.id],
      builder_id: authState.userLineIdToken
    }).then(function (response) {
      getPayments()
      getAccountingBook()
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
        key={payment.id}
        object={payment}
        editMode={editMode}
        {...accountingBookDetails}
      />)
  })

  const handleAddPayment = () => {
    history.push(`/liff_entry/groups/${group_id}/accounting_books/${accounting_book_id}/payments/new`)
  }

  let summarObjects = summary.map(object => {
    return <UserSummaryLabel
      currency_symbol={accountingBookDetails.currency_symbol}
      key={object.payer_id}
      object={object}
      accountingBookDetails={accountingBookDetails}/>
  })

  const steps = [
    {
      name: '帳目明細',
      component:
        <div style={paymentStyle} ref={paymentsRef}>
          {
            payments.length > 0 ?
              paymentLabels
              : <EmptyResult message='目前沒有任何款項喔'/> }
        </div>

    },
    {
      name: '分帳建議',
      component: <div style={paymentStyle} ref={summaryRef}>
        { summarObjects.length > 0 ?
            summarObjects
            : <EmptyResult message='目前沒有任何款項喔'/> }
      </div>
    }
  ]

//       component:
//         <AccountingBookSummaryPage users={users} accountingBookDetails={accountingBookDetails}/>

  return(
    <>
      <div style={styles.bg}>
        <PaymentsHeader
          index={index}
          loading={paymentLoading}
          paymentSize={payments.length}
          accountingBookDetails={accountingBookDetails}
        />

        <div style={paymentContainerStyle} ref={paymentContainerRef}>
          <PaymentInfoHeader
            discliamerClosedCallback={discliamerClosedCallback}
            index={index}
            loading={paymentLoading}
            paymentSize={payments.length}
            accountingBookDetails={accountingBookDetails}
          />


          {
            paymentLoading ? <div style={paymentStyle}><Loading /></div> :
              <ColumnSwappableView index={index} callback={handleIndexChanged} steps={steps} height={paymentsHeight}/>
          }
        </div>
      </div>
      <CircleFloatingIcon
        faicon='faPlus'
        faColor={themeColors.white}
        clicked={handleAddPayment}
        iconInlineStyle={{background: 'none', background: 'linear-gradient(92.29deg, #103C2B 0%, #07694D 100%)'}}
        containerInlineStyle={{ right: '30px', bottom: '24px'}}>
        <Svg icon='add' size='24'className='white'/>
      </CircleFloatingIcon>

      { deleteActive ? deleteConfirmBox : null }
    </>
  )
}

const styles = {
  bg: {
    width: '100%',
    height: 'calc(100vh)',
    overflow: 'hidden',
    display: 'flex',
    flexFlow: 'column',
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
