import React, { useState, useEffect, useContext } from 'react';
import { themeColors } from '../../../constants'
import { useParams } from 'react-router-dom';
import { Context as PaymentContext } from '../../../contexts/PaymentContext'
import { Context as AuthContext } from '../../../contexts/AuthContext'
import {
  Button,
  TextInput,
  ColumnSwappableView,
  UserCheckboxSelectLabel,
  UserRadioSelectAmountLabel,
} from '../../../components'
import {
  useUserRadioSelectAmountLabel,
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

  const [customOwers, customOwersSelect] = useUserRadioSelectAmountLabel({
    users: users,
    owers: state.manualOwers.value,
    callback: (owers) => setManualOwers({ owers }),
    valid: state.manualOwers.valid
  })

  const handleManualOwersChanged = (index, data) => {
    let newOwers = [..._manualOwers]
    newOwers[index] = data
    _setManualOwers(newOwers)
  }

  let i = -1
  const [_manualOwers, _setManualOwers] = useState([{ user: null, amount: null }])
  let radioAmountLabels = _manualOwers.map(ower => {
    i++
    return(
      <UserRadioSelectAmountLabel
        index={i}
        deleteActive={false}
        users={users}
        amount={ower.amount}
        user={ower.user}
        callback={handleManualOwersChanged}
      />
    )
  })

  const handleAddOwer = () => {
    let newOwers = [..._manualOwers]
    newOwers.push({ user: users[0], amount: null })
    _setManualOwers(newOwers)
  }

  const AddManualOwerButton = <Button
    color="gold"
    clicked={handleAddOwer}
    style={{
      color: themeColors.gold900
    }}> 新增</Button>


  const [ower, setOwer] = useState({ user: null, amount: null  })
  const radioAmountLabel = <UserRadioSelectAmountLabel
    index={0}
    deleteActive={false}
    users={users}
    amount={ower.amount}
    user={ower.user}
    callback={(index, o) => setOwer(o)}
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
        { radioAmountLabels }
        { AddManualOwerButton }
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
