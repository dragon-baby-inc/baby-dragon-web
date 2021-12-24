import React, { useCallback, useRef, useEffect, useState, useContext } from "react"
import ObserveSize from 'react-observe-size';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import useScrollInfo from 'react-element-scroll-hook';
import AccountingBookSummaryPage from '../pages/AccountingBookSummaryPage'
import { useHistory } from "react-router-dom";
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';
import { themeColors } from '../constants'
import { Context as AuthContext } from '../contexts/AuthContext'
import { usePayments, useAccountingBook, useAccountingBookSummary } from '../hooks'
import {
  UserSummaryLabel,
  DisclaimerBox,
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
//   const [scrollInfo, setRef] = useScrollInfo();
  const { group_id, accounting_book_id } = useParams();
  const [selectAll, setSelectAll] = useState(false)
  const [summary, loading, err, getAccountingBook] = useAccountingBookSummary(group_id, accounting_book_id)
  const [index, setIndex] = useState(0)
  const ref = useRef();
  const paymentRef = useRef();
  const paymentHeightRef = useRef();
  const summaryHeightRef = useRef();
  const [paymentsScrollInfo, setPaymentsScrollInfo] = useState({ x: { value: 0 }, y: { value: 0 } })
  const [paymentHeight, setPaymentHeight] = useState(0)
  const [summaryScrollInfo, setSummaryScrollInfo] = useState({ x: { value: 0 }, y: { value: 0 } })
  const [summaryHeight, setSummaryHeight] = useState(0)

  const handleScroll = useCallback((e) => {
    setSummaryScrollInfo({ x: { value: e.target.scrollLeft }, y: { value: e.target.scrollTop } })
  }, []);

  const handlePaymentsScroll = useCallback((e) => {
    setPaymentsScrollInfo({ x: { value: e.target.scrollLeft }, y: { value: e.target.scrollTop } })
  }, []);

  useEffect(() => {
    const div = ref.current
    if (div) {
      div.addEventListener('scroll', handleScroll);
      setSummaryHeight(ref.current.offsetHeight)
    }
  }, [ref.current]);

  useEffect(() => {
    const div = paymentRef.current
    if (div) {
      div.addEventListener('scroll', handlePaymentsScroll);
    }
  }, [paymentRef.current]);

  useEffect(() => {
    const div = summaryHeightRef.current
    if (div) {
      setSummaryHeight(summaryHeightRef.current.offsetHeight)
    }
  }, [summaryHeightRef.current])

  useEffect(() => {
    const div = paymentHeightRef.current
    if (div) {
      setPaymentHeight(paymentHeightRef.current.offsetHeight)
    }
  }, [paymentHeightRef.current])

  let currentDate = null
  let paymentLabels = []

  let paymentsHeight = small ? 'calc(100vh - 58px)' : 'calc(100vh - 58px - 120px)'
  paymentsHeight = "calc(100%)"
  let paymentStyle =  {
    background: '#FFFFFF',
    overflow: 'auto',
    marginTop: small ? '0px' : '0px',
    flexGrow: 1,
    height: paymentsHeight,
    paddingBottom: '260px'
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
          <div style={paymentStyle} ref={paymentRef}>
            {
            payments.length > 0 ?
              <div ref={paymentHeightRef}> {paymentLabels} </div>
            : <EmptyResult message='目前沒有任何款項喔'/> }
          </div>

    },
    {
      name: '分帳建議',
      component: <div style={paymentStyle} ref={ref}>
        { summarObjects.length > 0 ?
          <div ref={summaryHeightRef}> {summarObjects} </div>
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
          summaryHeight={summaryHeight}
          paymentHeight={paymentHeight}
          summaryScrollInfo={summaryScrollInfo}
          loading={paymentLoading}
          deactiveEditMode={deactiveEditMode}
          editMode={editMode}
          activeEditMode={activeEditMode}
          selectAll={selectAll}
          paymentSize={payments.length}
          scrollInfo={paymentsScrollInfo}
          small={small}
          accountingBookDetails={accountingBookDetails}
          handleSmallChange={handleSmallChange}
        />

        {
          paymentLoading ? <div style={paymentStyle}><Loading /></div> :
            <ColumnSwappableView index={index} callback={handleIndexChanged} steps={steps} height={paymentsHeight}/>
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
