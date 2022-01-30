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
  FullPageLoader,
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
    setAccountingBookDetails,
    resetForm,
  } = useContext(PaymentContext)

  const { group_id, accounting_book_id } = useParams()
  /* eslint-disable no-unused-vars */
  const { state: authState } = useContext(AuthContext)
  const [disableForm, setDisableForm] = useState(true)
  const [payment, paymentLoading] = usePayment(authState)
  const history = useHistory();
  const [users, accountingBookDetails, loading] = useAccountingBook(authState)
  const [_manualOwers, _setManualOwers] = useState([])
  const [_owers, _setOwers] = useState([])

  useEffect(() => {
    resetForm()
  }, [])

  useEffect(() => {
    if (users && authState.userLineIdToken) {
      let builder = users.filter(u => String(u.id) === authState.userLineIdToken)[0]
      setBuilder(builder)
    }
  }, [authState.userLineIdToken, users])

  useEffect(() => {
    if (!loading && !paymentLoading) {
      setId(payment.id)
      let payer = users.filter(u => String(u.id) === payment.payer_id)[0]
      setPayer(payer)

      if (payment.allocation_type === 'evenly') {
        let ower_ids = payment.allocations.map(a => a.ower_id)
        setOwers(users.filter(u => ower_ids.includes(u.id)))
        _setOwers(users.filter(u => ower_ids.includes(u.id)))
        setAllocationType('amount')

        let owers = payment.allocations.map(all => {
          let user = users.filter(u => u.id == all.ower_id)[0]
          return { user: user, amount: all.amount }
        })

        _setManualOwers(owers)
      } else if (payment.allocation_type === 'amount'){
        let owers = payment.allocations.map(all => {
          let user = users.filter(u => u.id == all.ower_id)[0]
          return { user: user, amount: all.amount }
        })

        _setManualOwers(owers)
        setAllocationType('amount')
      }

      setAccountingBookDetails(accountingBookDetails)
      setDisableForm(false)
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [paymentLoading, loading, users, accountingBookDetails])

  const handleBack = () => {
    resetForm()
    history.navigateTo("paymentIndexPage", { group_id, accounting_book_id })
  }


  const getOwers = () => {
    return users.map(user => {
      let ower = _manualOwers.filter(o => o.user.id === user.id)[0]
      return {
        user: user,
        amount: ower ? ower.amount : '',
        touched: true
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
        編輯帳款
      </PageHeader>
      <Separater style={{ margin: 0 }}/>
      {
        loading ?
          <FullPageLoader /> :
          <>
            {
              _manualOwers ?
                <PaymentForm
                  payment={payment}
                  authState={authState}
                  users={users.filter(u => u.coverCost === true)}
                  manualOwers={getOwers()}
                  owers={_manualOwers.filter(o => o.amount > 0).map(o => o.user)}/> : null
            }
          </>
      }
    </>
  )
}

export default PaymentEditPage;
