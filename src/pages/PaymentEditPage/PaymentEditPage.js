import React, { useState, useEffect, useContext } from 'react';
import { Context as PaymentContext } from '../../contexts/PaymentContext'
import { Context as AuthContext } from '../../contexts/AuthContext'
import { useParams } from 'react-router-dom';
import styles from '../PaymentCreationPage/PaymentCreationPage.module.scss'
import { themeColors } from '../../constants'
import {
  useHistory,
  usePayment,
  useAccountingBook,
} from '../../hooks'
import {
  PageHeader,
  TopRightIcon,
  PaymentForm,
  Separater
} from '../../components'

const PaymentEditPage = () => {
  const {
    state,
    setName,
    setAmount,
    setPayer,
    setBuilder,
    setOwers,
    setManualOwers,
    setId,
    setCreationDate,
    setAllocationType,
    setShowRadioSelect,
    setAccountingBookDetails,
    setShowCheckboxSelect,
    setShowPopUpForm,
    validateForm,
    createPayment,
    resetForm,
  } = useContext(PaymentContext)

  const { group_id, accounting_book_id } = useParams()
  const [disableForm, setDisableForm] = useState(true)
  const [payment, paymentLoading] = usePayment()
  const history = useHistory();
  const [users, accountingBookDetails, loading] = useAccountingBook()
  const { state: authState } = useContext(AuthContext)
  const [index, setIndex] = useState(0);
  const [_manualOwers, _setManualOwers] = useState([])

  useEffect(() => {
    resetForm()
  }, [])

  useEffect(() => {
    if (!loading && !paymentLoading) {
      setId(payment.id)
      let payer = users.filter(u => String(u.id) === payment.payer_id)[0]
      setPayer(payer)

      let builder = users.filter(u => String(u.id) === authState.userLineIdToken)[0]
      setBuilder(users[0])
      // if (!payer) { alert('未授權') }
      setAmount(parseFloat(payment.amount))
      setName(payment.description)
      setCreationDate(payment.paid_at)

      if (payment.allocation_type === 'evenly') {
        let ower_ids = payment.allocations.map(a => a.ower_id)
        setOwers(users.filter(u => ower_ids.includes(u.id)))
        setAllocationType(payment.allocation_type)
      } else if (payment.allocation_type === 'amount'){
        let owers = payment.allocations.map(all => {
          let user = users.filter(u => u.id == all.ower_id)[0]
          return { user: user, amount: all.amount }
        })
        setManualOwers({ owers, valid: true })
        _setManualOwers(owers)
        setAllocationType(payment.allocation_type)
        setIndex(1)
      }

      setAccountingBookDetails(accountingBookDetails)
      setDisableForm(false)
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [users, authState, paymentLoading, accountingBookDetails, loading])

  const handleBack = () => {
    resetForm()
    history.navigateTo("paymentIndexPage", { group_id, accounting_book_id })
  }

  return(
    <>
      <TopRightIcon
        clicked={handleBack}
        style={{ fontSize: '20px', right: '20px', color: 'black' }} >
        <div> 取消 </div>
      </TopRightIcon>
      <PageHeader color={themeColors.gray400}>
        編輯帳款
      </PageHeader>
      <Separater style={{ margin: 0 }}/>
      {
        _manualOwers ?
          <PaymentForm index={index} users={users} manualOwers={_manualOwers}/> : null
      }
    </>

  )
}

export default PaymentEditPage;
