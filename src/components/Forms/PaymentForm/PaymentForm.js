import React, { useState, useEffect, useContext } from 'react';
import { dragonBabyApi } from '../../../api/dragonBabyApi'
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
  OwerCheckboxSelectLabel,
  UserRadioSelectAmountLabel,
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
  const [alertMessage, setAlertMessage] = useState(null)
  const [_users, setUsers] = useState(users)

  useEffect(() => {
    if (users) {
      setUsers(users)
    }
  }, [users])

  useEffect(() => {
    if (payment) {
      _setName({ value: payment.description, valid: true })
      _setAmount({ value: payment.amount, valid: true })
      _setCreationDate({ value: payment.paid_at, valid: true })
      _setAllocationType(payment.allocation_type)
    }
  }, [payment])

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
    changed={(v) => _setName({ value: v, valid: v.length > 0 })}
    value={_name.value}
    valid={_name.valid}
    invalidFeedback="內容不可為空，12字內"
    type='text'
  />

  const datePickerInput = <DatePickerInput
    name='日期'
    changed={(v) => _setCreationDate({ value: v, valid: true })}
    value={_creation_date.value}
    faicon="fasCalendarAlt"
    />

  const amountInput = <TextInput
    key='amount'
    faicon="fasDollarSign"
    disabled={false}
    placeholder='輸入金額'
    name='金額'
    style={{ borderRadius: '16px' }}
    changed={(v) => _setAmount({ value: v, valid: v.length > 0 })}
    value={_amount.value}
    valid={_amount.valid}
    invalidFeedback="內容不可為空，小於100000000"
    type='number'
  />
  const handleAddCoverCostUser = (id) => {
    dragonBabyApi.updateCoverCostUser(group_id, accounting_book_id, [id])

    let newUsers = [..._users]
    let index = newUsers.findIndex(u => u.id === id)
    let user = newUsers[index]
    user.coverCost = true
    newUsers[index] = user
    setUsers(newUsers)
  }

  const owersLabel = <OwerCheckboxSelectLabel
    handleAddCoverCostUser={handleAddCoverCostUser}
    users={_users}
    callback={(ids) => _setOwers({ value: ids, valid: true })}
    valid={_owers.valid}
    selectedObjects={_owers.value}
  />

  const handleManualOwersChanged = (index, data) => {
    let newOwers = [..._manualOwers.value]
    newOwers[index] = data

    let objects = newOwers.filter(object => object.amount > 0)
    let amount = objects.reduce((prev, object) => {
      if (parseFloat(object.amount) > 0) { return prev + parseFloat(object.amount) }
      else { return (prev + 0) }
    }, 0)

    let valid = newOwers.filter(ower => ower.amount > 0).length === newOwers.length

    _setManualOwers({ value: newOwers, valid: valid })
  }

  const handleLabelDelete = (index) => {
    let newOwers = [..._manualOwers.value]
    if (newOwers.length === 1) {
      return
    }
    newOwers.splice(index, 1)
    _setManualOwers({ value: newOwers, valid: true})
  }

  let i = -1
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
        invalidFeedback="內容不可為空，小於100000000"
      />
    )
  })

  const handleAddOwer = () => {
    let newOwers = [..._manualOwers.value]
    newOwers.push({ user: selectUser(), amount: null })
    _setManualOwers({ value: newOwers, valid: true })
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
    _setManualOwers({ value: manualOwers, valid: true })
    _setOwers({ value: owers, valid: true })
  }, [payer])

  const [value, select] = useUsersSelect({ users, buildSelectUsers, selectAll: true })

  const steps = [
    {
      name: '平分',
      component: <div className={styles.stepContainer}>
        { nameInput }
        { alertMessage }
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
        { alertMessage }
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
    let newState = {
      ...state,
      manualOwers: _manualOwers,
      owers: _owers,
      payer: { value: payer, valid: true },
      name: _name,
      creation_date: _creation_date,
      amount: _amount,
      allocation_type: _allocationType
    }

    let valid = validateForm(newState, form[_allocationType], validate)
    if (!valid) { return }
    createPayment(newState, () => {
      resetForm()
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
      <ColumnSwappableView
        styles={defaultStyles}
        index={index ? index : 0}
        key="PaymentCreationPage__ColumnSwappableView"
        callback={(index) => { index === 0 ? _setAllocationType('evenly') : _setAllocationType('amount') }}
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
