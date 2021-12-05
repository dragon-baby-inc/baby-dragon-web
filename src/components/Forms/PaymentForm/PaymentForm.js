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

const PaymentForm = () => {
  const { group_id, accounting_book_id } = useParams()
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
      setManualOwers({ owers: [{ user: users[0], amount: null }], valid: true })
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [users, authState, accountingBookDetails, loading])

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

  const [customOwers, customOwersSelect] = useUserRadioSelectAmountLabel({
    users: users,
    owers: state.manualOwers.value,
    callback: (owers) => setManualOwers({ owers }),
    valid: state.manualOwers.valid
  })

  const handleManualOwersChanged = (index, data) => {
    let newOwers = [..._manualOwers]
    newOwers[index] = data
    setManualOwers({ owers: newOwers })
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


  const buildSelectUsers = (users) => {
    return users.filter((u) => u.coverCost).map((u) => u.id)
  }

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
        {JSON.stringify(state.manualOwers)}
        {JSON.stringify(state.name.value)}
        {JSON.stringify(state.fixedAmount)}
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
    let valid = validateForm(state, form[state.allocation_type])
    if (!valid) { return }
    createPayment(state, () => {
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
