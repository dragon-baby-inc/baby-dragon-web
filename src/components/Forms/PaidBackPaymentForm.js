import React, { useContext } from "react"
import TextInput from '../FormElements/TextInput/TextInput'
import RadioSelectInput from '../FormElements/SelectInput/RadioSelectInput'
import DatePickerInput from '../FormElements/DatePickerInput/DatePickerInput'
import { Context } from '../../contexts/PaymentContext'
import { Context as AuthContext } from '../../contexts/AuthContext'
import Button from '../FormElements/Button/Button'

const styles = {
  labelStyle: {
    marginBottom: '12px',
  },
  container: {
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between'
  }
}

const NewPaymentForm = ({ users }) => {
  const { state: authState } = useContext(AuthContext)
  const {
    state,
    setName,
    setAmount,
    setPayer,
    setOwer,
    setCreationDate,
    setShowRadioSelect,
    validateForm,
  } = useContext(Context)

  let payerValue = state.payer.value
  if (state.payer.value && state.payer.value.id === authState.userLineIdToken) {
    payerValue =  '預設自己'
  } else {
    payerValue = payerValue ? payerValue.displayName : null
  }

  const handlePayerSelectClicked = () => {
    let payer_id = state.payer.value ? state.payer.value.id : null
    setShowRadioSelect(setPayer, payer_id)
  }

  const handleOwerSelectClicked = () => {
    let ower_id = state.ower.value ? state.ower.value.id : null
    setShowRadioSelect(setOwer, ower_id)
  }

  const handleSubmit = () => {
    validateForm(state,  ['name', 'amount', 'payer', 'ower'])
  }

  return(
    <div style={styles.container}>
      <div style={styles.form}>
        <TextInput
          placeholder={'輸入名稱'}
          name={'名稱'}
          labelStyle={styles.labelStyle}
          changed={setName}
          value={state.name.value}
          valid={state.name.valid}
          invalidFeedback="*不可為空白，12字內"
          type='text'
        />
        <TextInput
          labelStyle={styles.labelStyle}
          placeholder={'輸入金額'}
          name={'金額'}
          changed={setAmount}
          value={state.amount.value}
          valid={state.amount.valid}
          invalidFeedback="*不可為空白"
          type='number'
        />
        <RadioSelectInput
          placeholder={'預設自己'}
          name={'付款者'}
          clicked={handlePayerSelectClicked}
          labelStyle={styles.labelStyle}
          value={payerValue}
          valid={state.payer.valid}
        />
        <RadioSelectInput
          placeholder={'選取收款者'}
          name={'收款者'}
          clicked={handleOwerSelectClicked}
          labelStyle={styles.labelStyle}
          value={state.ower.value ? state.ower.value.displayName : null}
          valid={state.ower.valid}
        />
        <DatePickerInput
          placeholder={'今日'}
          name={'日期'}
          labelStyle={styles.labelStyle}
          value={state.creation_date.value}
          changed={setCreationDate}
        />

      </div>
      <Button clicked={handleSubmit}>確認</Button>
    </div>
  )
}

export default NewPaymentForm
