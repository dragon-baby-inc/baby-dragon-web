import React, { useState, useEffect, useContext } from 'react';
import styles from './PaymentForm.module.scss'
import { themeColors } from '../../../constants'
import { useParams } from 'react-router-dom';
import { Context as PaymentContext } from '../../../contexts/PaymentContext'
import { Context as AuthContext } from '../../../contexts/AuthContext'
import {
  Section,
  Footer,
  DatePickerInput,
  Button,
  TextInput,
  ColumnSwappableView,
  UserCheckboxSelectLabel,
  UserRadioSelectAmountLabel,
} from '../../../components'
import {
  useHistory,
  useUserRadioSelectAmountLabel,
  useUserRadioSelectLabel,
  useAccountingBook,
  useUsersSelect,
} from '../../../hooks'

const PaymentForm = ({ users }) => {
  const { group_id, accounting_book_id } = useParams()
  const history = useHistory();
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

  const [payer, payerLabel] = useUserRadioSelectLabel({
    users: users,
    initialValue: state.payer.value,
  })

  const nameInput = <TextInput
    style={{ paddingTop: '16px' }}
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

  const datePickerInput = <DatePickerInput
    name='日期'
    changed={setCreationDate}
    value={state.creation_date.value}
    faicon="farCreditCard"
    />

  const amountInput = <TextInput
    key='amount'
    faicon="farCreditCard"
    disabled={false}
    placeholder='輸入金額'
    name='金額'
    style={{ borderRadius: '16px' }}
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

  const [alertMessage, setMessage] = useState(null)
  const validateManulOwers = (newState) => {
    console.log(newState.manualOwers)
    setMessage(JSON.stringify({ manualOwers: newState.manualOwers, creation_date: newState.creation_date.valid, payer: newState.payer.valid, owers: newState.payer.valid, amount: newState.amount.valid, name: newState.name.valid }))

    if (newState.manualOwers && !newState.manualOwers.valid) {
      _setManualOwers({ value: newState.manualOwers.value, valid: false })
      setManualOwers({ owers: newState.manualOwers.value, valid: false })
    }
  }

  const handleManualOwersChanged = (index, data) => {
    let newOwers = [..._manualOwers.value]
    newOwers[index] = data

    let objects = newOwers.filter(object => object.amount > 0)
    let amount = objects.reduce((prev, object) => {
      if (parseFloat(object.amount) > 0) { return prev + parseFloat(object.amount) }
      else { return (prev + 0) }
    }, 0)

    let valid = newOwers.filter(ower => ower.amount > 0).length === newOwers.length

    setManualOwers({ owers: newOwers, valid: valid })
    _setManualOwers({ value: newOwers, valid: valid })
  }

  const handleLabelDelete = (index) => {
    let newOwers = [..._manualOwers.value]
    if (newOwers.length === 1) {
      return
    }
    newOwers.splice(index, 1)
    setManualOwers({ owers: newOwers, valid: null })
    _setManualOwers({ value: newOwers, valid: null})
  }

  let i = -1
  const [_manualOwers, _setManualOwers] = useState({ value: [], valid: true })
  let radioAmountLabels = _manualOwers.value.map(ower => {
    i++
    return(
      <UserRadioSelectAmountLabel
        key={i}
        valid={_manualOwers.valid}
        index={i}
        deleted={handleLabelDelete}
        deleteActive={_manualOwers.value.length > 1}
        users={users}
        amount={ower.amount}
        user={ower.user}
        callback={handleManualOwersChanged}
      />
    )
  })

  const handleAddOwer = () => {
    let newOwers = [..._manualOwers.value]
    newOwers.push({ user: selectUser(), amount: null })
    setManualOwers({ owers: newOwers, valid: null })
    _setManualOwers({ value: newOwers, valid: null })
  }

  const selectUser = () => {
    let existing = []
    _manualOwers.value.reduce((prev, ower) => {
      if (ower.user) {
        existing.push(ower.user.id)
      }
    }, existing)

    if (state.payer.value) {
      existing.push(state.payer.value.id)
    }

    let newUsers = users.filter(u => !existing.includes(u.id))

    return newUsers.length > 0 ? newUsers[0] : users[0]
  }

  const AddManualOwerButton = <Button
    color="gold"
    clicked={handleAddOwer}
    style={{
      color: themeColors.gold900
    }}> 新增</Button>


  const buildSelectUsers = (users) => {
    return users.filter((u) => u.coverCost).map((u) => u.id)
  }

  useEffect(() => {
    let user = users[0]
    if (state.payer.value && users.length > 1) {
      user = users.filter(u => u.id !== state.payer.value.id)[0]
    }

    _setManualOwers({ value: [{ user: user, amount: null }], valid: true })
  }, [users, state.payer.value])

  const [value, select] = useUsersSelect({ users, buildSelectUsers, selectAll: true })

  const steps = [
    {
      name: '平分',
      component: <div className={styles.stepContainer}>
        { nameInput }
        { amountInput }
        { datePickerInput }
        <Section name="付款者"/>
        { payerLabel }
        <Section name="分款者" style={{ marginTop: '16px' }}/>
        { owersLabel }
      </div>
    },
    {
      name: '自己分',
      component: <div className={styles.stepContainer}>
        { nameInput }
        { datePickerInput }
        <Section name="付款者"/>
        { payerLabel }
        <Section name="欠款者" style={{ marginTop: '16px' }}/>
        { radioAmountLabels }
        <div className={styles.AddOwerbutton}>
          { AddManualOwerButton }
        </div>
      </div>
    }
  ]

  const form = {
    evenly: ['name', 'amount', 'payer', 'owers', 'creation_date'],
    amount: ['name', 'payer','manualOwers', 'creation_date'],
  }

  const handleSubmit = () => {
    let newState = { ...state, manualOwers: _manualOwers }
    let valid = validateForm(newState, form[state.allocation_type], validateManulOwers)
    if (!valid) { return }
    createPayment(newState, () => {
      history.navigateTo("paymentIndexPage", { group_id, accounting_book_id })
    })
  }

  return(
    <div className={styles.container}>
      <ColumnSwappableView
        styles={defaultStyles}
        key="PaymentCreationPage__ColumnSwappableView"
        height="calc(100% - 10px)"
        callback={(index) => { index === 0 ? setAllocationType('evenly') : setAllocationType('amount') }}
        steps={steps} />

      <div className={styles.footer}>
        <Button clicked={handleSubmit}>建立帳款</Button>
      </div>
    </div>
  )
}

  const defaultStyles = {
    root: {
      flexGrow: 1,
      maxHeight: '-webkit-fill-available',
      margin: 0,
      height: 'calc(100% - 49px - 84px)',
      overflow: 'hidden',
    },
    slideContainer: {
      height: 'calc(100%)',
      margin: 0,
      overflow: 'hidden',
    },
    slide: {
      overflow: 'auto',
      height: 'calc(100%)',
      backgroundColor: '#FFFFFF',
    },
  };
export default PaymentForm
