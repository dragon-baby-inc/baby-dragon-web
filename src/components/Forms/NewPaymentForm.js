import React, { useState, useContext, useEffect } from "react"
import Toggle from '../FormElements/FormTypeToggle/Toggle'
import PopUpInput from '../FormElements/PopUpInput/PopUpInput'
import TextInput from '../FormElements/TextInput/TextInput'
import RadioSelectInput from '../FormElements/SelectInput/RadioSelectInput'
import CheckboxSelectInput from '../FormElements/SelectInput/CheckboxSelectInput'
import DatePickerInput from '../FormElements/DatePickerInput/DatePickerInput'
import { Context } from '../../contexts/PaymentContext'
import { Context as AuthContext } from '../../contexts/AuthContext'
import Button from '../FormElements/Button/Button'

const styles = {
  labelStyle: {
    marginBottom: '12px',
  },
  form: {
    height: '100%',
    flexGrow: 1
  },
  container: {
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between'
  },
}

const form = {
  evenly: ['name', 'amount', 'payer', 'owers', 'creation_date'],
  amount: ['name', 'fixedAmount', 'payer','manualOwers', 'creation_date'],
}

const formValidation = {
  evenly: ['name', 'amount', 'payer', 'owers', 'creation_date'],
  amount: ['name', 'payer','manualOwers', 'creation_date'],
}

const NewPaymentForm = ({ loading, users, afterSubmit }) => {
  const {
    state,
    setName,
    setAmount,
    setPayer,
    setOwers,
    setManualOwers,
    setCreationDate,
    setAllocationType,
    setShowRadioSelect,
    setShowCheckboxSelect,
    setShowPopUpForm,
    validateForm,
    createPayment,
  } = useContext(Context)
  const { state: authState } = useContext(AuthContext)
  const [disableSubmit, setDisableSubmit] = useState(false)

  let payerValue = state.payer.value
  if (state.payer.value && state.payer.value.id === authState.userLineIdToken) {
    payerValue =  '預設自己'
  } else {
    payerValue = payerValue ? payerValue.displayName : null
  }

  const handleToggleChanged = (e) => {
    if (state.disableForm) { return }
    if (e.target.checked) {
      setAllocationType('amount')
    } else {
      setAllocationType('evenly')
    }
  }
  const checked = state.allocation_type === 'evenly' ? false : true

  const handlePayerSelectClicked = () => {
    if (state.disableForm) { return }
    let payer_id = state.payer.value ? state.payer.value.id : null
    setShowRadioSelect(setPayer, payer_id)
  }

  const handleOwersSelectClicked = () => {
    if (state.disableForm) { return }
    let owers = state.owers.value ? state.owers.value.map(el => el.id) : users.map(el => el.id)
    setShowCheckboxSelect(setOwers, owers)
  }

  const handleManualOwersSelectClicked = () => {
    if (state.disableForm) { return }
    setShowPopUpForm(setManualOwers, state.manualOwers.value)
  }

  const handleSubmit = () => {
    if (validateForm(state, formValidation[state.allocation_type])) {
      setDisableSubmit(true)
      createPayment(state, afterSubmit)
    }
  }

  const components = {
    name: <TextInput
      disabled={state.disableForm}
      placeholder={'輸入名稱'}
      name={'名稱'}
      labelStyle={styles.labelStyle}
      changed={setName}
      value={state.name.value}
      valid={state.name.valid}
      invalidFeedback="*不可為空白，12字內"
      type='text'
    />,
    amount: <TextInput
      disabled={state.disableForm}
      labelStyle={styles.labelStyle}
      placeholder={'輸入金額'}
      name={'金額'}
      changed={setAmount}
      value={state.amount.value}
      valid={state.amount.valid}
      invalidFeedback="*不可為空白"
      type='number'
    />,
    fixedAmount: <TextInput
      disabled={state.disableForm}
      labelStyle={styles.labelStyle}
      placeholder={'輸入金額'}
      name={'金額'}
      changed={setAmount}
      value={state.fixedAmount.value}
      valid={state.fixedAmount.valid}
      invalidFeedback="*不可為空白"
      type='number'
      disabled={true}
    />,
    payer: <RadioSelectInput
      placeholder={'選取付款者'}
      name={'付款者'}
      clicked={handlePayerSelectClicked}
      labelStyle={styles.labelStyle}
      value={payerValue}
      valid={state.payer.valid}
      type='number'
    />,
    owers: <CheckboxSelectInput
      placeholder={'所有人分'}
      name={'分款者'}
      labelStyle={styles.labelStyle}
      changed={setPayer}
      clicked={handleOwersSelectClicked}
      selectAll={state.owers.value ? state.owers.value.length === users.length : false }
      value={state.owers ? state.owers.value : null}
      valid={state.owers.valid}
      type='number'
    />,
    manualOwers: <PopUpInput
      placeholder={'編輯分款'}
      name={'分款者'}
      labelStyle={styles.labelStyle}
      changed={setPayer}
      clicked={handleManualOwersSelectClicked}
      value={state.manualOwers ? state.manualOwers.value : null}
      valid={state.manualOwers.valid}
      type='number'
    />,
    creation_date: <DatePickerInput
      placeholder={'今日'}
      name={'日期'}
      labelStyle={styles.labelStyle}
      value={state.creation_date.value}
      changed={setCreationDate}
      type='number'
    />
  }

  const displayComponents = form[state.allocation_type].map(componentName => {
    return components[componentName]
  })

  return(
    <div style={styles.container}>
        <div style={styles.form}>
            <Toggle changed={handleToggleChanged} checked={checked}/>
            {displayComponents}
        </div>
      <Button disabled={disableSubmit && state.disableForm} clicked={handleSubmit}>確認</Button>
    </div>
  )
}

export default NewPaymentForm
