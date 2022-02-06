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
  FullPageLoader,
  PageHeader,
  TopRightIcon,
  PaymentForm,
  Separater
} from '../../components'

const PaymentCreationPage = () => {
  const { group_id, accounting_book_id } = useParams()
  /* eslint-disable no-unused-vars */
  const { state: authState } = useContext(AuthContext)
  const [disableForm, setDisableForm] = useState(true)
  const history = useHistory();
  const [users, accountingBookDetails, loading] = useAccountingBook(authState)
  const [payer, _setPayer] = useState(null)
  const {
    state,
    setPayer,
    setBuilder,
    setAccountingBookDetails,
    resetForm
  } = useContext(PaymentContext)

  useEffect(() => {
    resetForm()
  }, [])

  const handleBack = () => {
    resetForm()
    history.navigateTo("paymentIndexPage", { group_id, accounting_book_id })
  }

  useEffect(() => {
    if (users && authState.userLineIdToken) {
      let builder = users.filter(u => String(u.id) === authState.userLineIdToken)[0]
      setBuilder(builder)
    }
  }, [authState.userLineIdToken, users])

  useEffect(() => {
    if (!loading && authState && authState.api) {
      let builder = users.filter(u => String(u.id) === authState.userLineIdToken)[0]
      let payer = builder
      if (!payer) { payer = users[0] }
      if (!payer.coverCost) { payer = users.filter(u => u.coverCost === true)[0] }

      setPayer(payer)
      setAccountingBookDetails(accountingBookDetails)
      _setPayer(payer)

      setDisableForm(false)
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [loading, users, accountingBookDetails])

  const coverCostUsers = users.filter(u => u.coverCost === true)

  const getOwers = () => {
    return coverCostUsers.map(user => {
      return {
        user: user,
        amount: null,
        touched: false
      }
    })
  }

  return(
    <>
      <TopRightIcon
        clicked={handleBack}
        style={{ fontSize: '20px', right: '20px', color: 'black' }} >
        <div> 取消 </div>
      </TopRightIcon>
      <PageHeader color={themeColors.gray400}>
        新增帳款至<span style={{ color: themeColors.green700, paddingLeft: '4px' }}>{ accountingBookDetails.name ? ` ${accountingBookDetails.name}` : '' }</span>
      </PageHeader>
      <Separater style={{ margin: 0 }}/>
      {
        loading ?
          <FullPageLoader /> :
          <>
            {
              payer ?
                <PaymentForm
                  authState={authState}
                  users={coverCostUsers}
                  manualOwers={getOwers()}
                  owers={coverCostUsers}/> : null
            }
          </>
      }
    </>
  )
}

export default PaymentCreationPage;
