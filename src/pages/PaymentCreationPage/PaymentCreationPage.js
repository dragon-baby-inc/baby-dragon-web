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
    setOwers,
    setManualOwers,
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
    if (!loading && authState && authState.api) {
      let builder = users.filter(u => String(u.id) === authState.userLineIdToken)[0]
      setBuilder(builder)

      let payer = builder
      if (!payer) { payer = users[0] }

      setPayer(payer)
      setAccountingBookDetails(accountingBookDetails)

      setOwers(users.filter((u) => u.coverCost))
      _setPayer(payer)

      let user = users[-1]
      if (users.length > 1) {
        user = users.filter(u => u.id !== payer.id)[0]
      }

      setManualOwers({ owers: [{ user: user, amount: null }], valid: true, first: true })
      setDisableForm(false)
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [authState, loading])

  const getUser = () => {
    let user = users.filter(u => u.id !== payer.id)[0]
    if (!user) { user = users[0] }
    return user
  }

  return(
    <>
      <TopRightIcon
        clicked={handleBack}
        style={{ fontSize: '20px', right: '20px', color: 'black' }} >
        <div> 取消 </div>
      </TopRightIcon>
      <PageHeader color={themeColors.gray400}>
        新增帳款
      </PageHeader>
      <Separater style={{ margin: 0 }}/>
      {
        loading ?
          <FullPageLoader /> :
          <>
            {
              payer ?
                <PaymentForm authState={authState} users={users} manualOwers={[ {user: getUser(), amount: null} ]} owers={users.filter(u => u.coverCost === true)}/> : null
            }
          </>
      }
    </>
  )
}

export default PaymentCreationPage;
