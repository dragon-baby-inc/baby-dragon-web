import React, { useState, useEffect, useContext } from 'react';
import { Context as PaymentContext } from '../../contexts/PaymentContext'
import { Context as AuthContext } from '../../contexts/AuthContext'
import { useParams } from 'react-router-dom';
import styles from './PaymentCreationPage.module.scss'
import { themeColors } from '../../constants'
import {
  useHistory,
  useAccountingBook,
} from '../../hooks'
import {
  PageHeader,
  TopRightIcon,
  PaymentForm,
  Separater
} from '../../components'

const PaymentCreationPage = () => {
  const { group_id, accounting_book_id } = useParams()
  const [disableForm, setDisableForm] = useState(true)
  const history = useHistory();
  const [users, accountingBookDetails, loading] = useAccountingBook()
  const { state: authState } = useContext(AuthContext)
  const {
    state,
    setName,
    setAmount,
    setPayer,
    setBuilder,
    setOwers,
    setManualOwers,
    setCreationDate,
    setAllocationType,
    setShowRadioSelect,
    setAccountingBookDetails,
    setShowCheckboxSelect,
    setShowPopUpForm,
    validateForm,
    createPayment,
    resetForm
  } = useContext(PaymentContext)

  useEffect(() => {
    resetForm()
  }, [])


  useEffect(() => {
    if (!loading) {
      let payer = users.filter(u => String(u.id) === authState.userLineIdToken)[0]
      if (payer) { setPayer(payer) }
      // if (!payer) { alert('未授權') }
      setPayer(users[0])
      setAccountingBookDetails(accountingBookDetails)
      setBuilder(users[0])
      setOwers(users.filter((u) => u.coverCost))
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [users, authState, accountingBookDetails, loading])

  return(
    <>
      <TopRightIcon
        clicked={() => {history.navigateTo("paymentIndexPage", { group_id, accounting_book_id })}}
        style={{ fontSize: '20px', right: '20px', color: 'black' }} >
        <div> 取消 </div>
      </TopRightIcon>
      <PageHeader color={themeColors.gray400}>
        新增帳款
      </PageHeader>
      <Separater style={{ margin: 0 }}/>
      <PaymentForm users={users}/>
    </>
  )
}

export default PaymentCreationPage;
