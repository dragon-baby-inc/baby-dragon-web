import React, { useContext, useEffect } from "react"
import Toggle from '../FormElements/FormTypeToggle/Toggle'
import TextInput from '../FormElements/TextInput/TextInput'
import RadioSelectInput from '../FormElements/SelectInput/RadioSelectInput'
import CheckboxSelectInput from '../FormElements/SelectInput/CheckboxSelectInput'
import DatePickerInput from '../FormElements/DatePickerInput/DatePickerInput'
import { Context } from '../../contexts/PaymentContext'
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

const form = {
  amount: ['name', 'amount', 'payer', 'owers'],
  evenly: ['name', 'amount', 'payer', 'owers'],
}

const NewPaymentForm = ({ users }) => {
  const {
    state,
    setName,
    setAmount,
    setPayer,
    setOwers,
    setCreationDate,
    setAllocationType,
    setShowRadioSelect,
    setShowCheckboxSelect,
    validateForm,
  } = useContext(Context)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setOwers(users)
  }, [users])

  console.log(state)

  const handleToggleChanged = (e) => {
    if (e.target.checked) {
      setAllocationType('amount')
    } else {
      setAllocationType('evenly')
    }
  }
  const checked = state.allocation_type === 'evenly' ? false : true

  const handlePayerSelectClicked = () => {
    let payer_id = state.payer.value ? state.payer.value.id : null
    setShowRadioSelect(setPayer, payer_id)
  }

  const handleOwersSelectClicked = () => {
    let owers = state.owers.value ? state.owers.value.map(el => el.id) : users.map(el => el.id)
    setShowCheckboxSelect(setOwers, owers)
  }

  const handleSubmit = () => {
    validateForm(state, form[state.allocation_type])
  }

  return(
    <div style={styles.container}>
      <div style={styles.form}>
        <Toggle changed={handleToggleChanged} checked={checked}/>
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
          value={state.payer.value ? state.payer.value.displayName : null}
          valid={state.payer.valid}
          type='number'
        />
        <CheckboxSelectInput
          placeholder={'所有人分'}
          name={'分款者'}
          labelStyle={styles.labelStyle}
          changed={setPayer}
          clicked={handleOwersSelectClicked}
          selectAll={state.owers.value ? state.owers.value.length === users.length : false }
          value={state.owers ? state.owers.value : null}
          valid={state.owers.valid}
          type='number'
        />
        <DatePickerInput
          placeholder={'今日'}
          name={'日期'}
          labelStyle={styles.labelStyle}
          value={state.creation_date.value}
          changed={setCreationDate}
          type='number'
        />

      </div>
      <Button clicked={handleSubmit}>確認</Button>
    </div>
  )
}

export default NewPaymentForm
