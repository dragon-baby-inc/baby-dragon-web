import React, { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import styles from './PaidBackForm.module.scss'
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
  OwerCheckboxSelectLabel,
} from '../../../components'
import {
  useHistory,
  useUserRadioSelectAmountLabel,
  useUserRadioSelectLabel,
  useAccountingBook,
  useUsersSelect,
} from '../../../hooks'

const PaymentForm = ({ users, manualOwers, index, owers, payment }) => {
  const { group_id, accounting_book_id } = useParams()
  const { state: authState } = useContext(AuthContext)
  const [cookies, setCookie, removeCookie] = useCookies([]);
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

  const [_allocationType, _setAllocationType] = useState('evenly')
  const [_name, _setName] = useState({ value: '', valid: true })
  const [_amount, _setAmount] = useState({ value: null, valid: true })
  const [_creation_date, _setCreationDate] = useState({ value: null, valid: true })
  const [_owers, _setOwers] = useState({ value: [], valid: true })
  const [_manualOwers, _setManualOwers] = useState({ value: [], valid: true })
  const [_payer, _setPayer] = useState({ value: null, valid: true })
  const [_ower, _setOwer] = useState({ value: null, valid: true })
  const [alertMessage, setAlertMessage] = useState(null)

  useEffect(() => {
    if (payment) {
      _setName({ value: payment.description, valid: true })
      _setAmount({ value: payment.amount, valid: true })
      _setCreationDate({ value: payment.paid_at, valid: true })
      _setAllocationType(payment.allocation_type)

      let builder = users.filter(u => String(u.id) === authState.userLineIdToken)[0]
      if (!builder) { builder = users[0] }
      setBuilder(builder)
      // if (!builder) { alert('未授權') }

      let payer = users.filter(u => u.id === payment.payer_id)[0]
      let ower = users.filter(u => u.id === payment.ower_id)[0]

      _setPayer({ value: payer, valid: true })
      _setOwer({ value: ower, valid: true })
    }
  }, [payment, users, authState])

  const [payer, payerLabel] = useUserRadioSelectLabel({
    users: users,
    initialValue: _payer.value
  })

  const [ower, owerLabel] = useUserRadioSelectLabel({
    users: users,
    initialValue: _ower.value
  })

  const nameInput = <TextInput
    style={{ paddingTop: '16px' }}
    key='name'
    faicon="farCreditCard"
    disabled={false}
    placeholder='輸入名稱'
    name={'名稱'}
    changed={(v) => _setName({ value: v, valid: v.length > 0 })}
    value={_name.value}
    valid={_name.valid}
    invalidFeedback="*不可為空白，12字內"
    type='text'
  />

  const datePickerInput = <DatePickerInput
    name='日期'
    changed={(v) => _setCreationDate({ value: v, valid: true })}
    value={_creation_date.value}
    faicon="farCreditCard"
    />

  const amountInput = <TextInput
    key='amount'
    faicon="farCreditCard"
    disabled={false}
    placeholder='輸入金額'
    name='金額'
    style={{ borderRadius: '16px' }}
    changed={(v) => _setAmount({ value: v, valid: v.length > 0 })}
    value={_amount.value}
    valid={_amount.valid}
    invalidFeedback="*不可為空白，12字內"
    type='number'
  />

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

  useEffect(() => {
    _setManualOwers({ value: manualOwers, valid: true })
    _setOwers({ value: owers, valid: true })
  }, [payer])

  const owerForm = ['name', 'payer','ower', 'creation_date']

  const handleSubmit = () => {
    let newState = {
      ...state,
      id: payment.id,
      ower: { value: ower, valid: true },
      payer: { value: payer, valid: true },
      name: _name,
      creation_date: _creation_date,
      amount: _amount,
      allocation_type: _allocationType,
      paid_back: true
    }

    let valid = validateForm(newState, owerForm, validate)
    if (!valid) { return }
    createPayment(newState, () => {
      resetForm()
      removeCookie('payment')
      history.navigateTo("paymentIndexPage", { group_id, accounting_book_id })
    })
  }

  const setFunction = {
    'name': _setName,
    'manualOwers': _setManualOwers,
    'amount': _setAmount,
  }

  const validate = (newState) => {
    if (!newState) { return }

    ['name', 'manualOwers', 'amount'].forEach(el => {
      if (newState[el] && !newState[el].valid) {
        setFunction[el]({ value: newState[el].value, valid: false })
      }
    })
  }

  return(
    <div className={styles.container}>
      <div className={styles.stepContainer}>
        { nameInput }
        { alertMessage }
        { amountInput }
        { datePickerInput }
        <Section name="還款者"/>
        { payerLabel }
        <Section name="還給" style={{ marginTop: '16px' }}/>
        { owerLabel }
      </div>

      <div className={styles.footer}>
        <Button clicked={handleSubmit}>建立還款</Button>
      </div>
    </div>
  )
}

export default PaymentForm
