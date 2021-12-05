import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context as PaymentContext } from '../../../contexts/PaymentContext'
import { Context as AuthContext } from '../../../contexts/AuthContext'
import {
  TextInput,
  ColumnSwappableView,
  UserCheckboxSelectLabel,
} from '../../../components'
import {
  useUserRadioSelectLabel,
  useAccountingBook,
  useUsersSelect,
} from '../../../hooks'

const PaymentForm = () => {
  const { group_id, accounting_book_id } = useParams()
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
      setManualOwers({ owers: [{ user: users[0], amount: null }], valid: true })
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [users, authState, accountingBookDetails, loading])

  const [payer, payerLabel] = useUserRadioSelectLabel({
    users: users,
    initialValue: state.payer.value,
  })

  const nameInput = <TextInput
    key='name'
    faicon="farCreditCard"
    disabled={false}
    placeholder='輸入名稱'
    name={'名稱'}
    changed={setName}
    value={state.name.value === undefined ? '' : state.name.value}
    valid={state.name.valid}
    invalidFeedback="*不可為空白，12字內"
    type='text'
  />

  const amountInput = <TextInput
    key='amount'
    faicon="farCreditCard"
    disabled={false}
    placeholder='輸入金額'
    name='金額'
    changed={setAmount}
    value={state.amount.value === undefined ? '' : state.amount.value}
    valid={state.amount.valid}
    invalidFeedback="*不可為空白，12字內"
    type='number'
  />

  const owersLabel = <UserCheckboxSelectLabel
    users={users}
    callback={setOwers}
    selectedObjects={state.owers.value}
  />

  const buildSelectUsers = (users) => {
    return users.filter((u) => u.coverCost).map((u) => u.id)
  }

  const [value, select] = useUsersSelect({ users, buildSelectUsers, selectAll: true })

  const steps = [
    {
      name: '平分',
      component: <div>
        { nameInput }
        { amountInput }
        { payerLabel }
        { owersLabel }
      </div>
    },
    {
      name: '自己分',
      component: <div>test </div>
    }
  ]

  return(
    <div>
      <ColumnSwappableView
        key="PaymentCreationPage__ColumnSwappableView"
        index={0}
        height={'100%'}
        steps={steps} />
    </div>
  )
}

export default PaymentForm
