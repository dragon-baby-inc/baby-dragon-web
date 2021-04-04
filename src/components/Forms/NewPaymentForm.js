import React, { useContext, useEffect } from "react"
import Toggle from '../FormElements/FormTypeToggle/Toggle'
import TextInput from '../FormElements/TextInput/TextInput'
import RadioSelectInput from '../FormElements/SelectInput/RadioSelectInput'
import CheckboxSelectInput from '../FormElements/SelectInput/CheckboxSelectInput'
import { Context } from '../../contexts/PaymentContext'

const styles = {
  labelStyle: {
    marginBottom: '12px',
  }
}

const NewPaymentForm = ({ users }) => {
  const {
    state,
    setName,
    setAmount,
    setPayer,
    setOwers,
    setAllocationType,
    setShowRadioSelect,
    setShowCheckboxSelect
  } = useContext(Context)

  useEffect(() => {
    setOwers(users)
  }, [users])

  const handleToggleChanged = (e) => {
    if (e.target.checked) {
      setAllocationType('amount')
    } else {
      setAllocationType('evenly')
    }
  }
  const checked = state.allocation_type === 'evenly' ? false : true

  const handlePayerSelectClicked = () => {
    let payer_id = state.payer ? state.payer.id : null
    setShowRadioSelect(setPayer, payer_id)
  }

  const handleOwersSelectClicked = () => {
    let owers = state.owers ? state.owers.map(el => el.id) : users.map(el => el.id)
    setShowCheckboxSelect(setOwers, owers)
  }

  return(
    <div>
      <Toggle changed={handleToggleChanged} checked={checked}/>
      <TextInput
        placeholder={'輸入名稱'}
        name={'名稱'}
        labelStyle={styles.labelStyle}
        changed={setName}
        value={state.name}
        type='text'
      />
      <TextInput
        labelStyle={styles.labelStyle}
        placeholder={'輸入金額'}
        name={'金額'}
        changed={setAmount}
        value={state.amount}
        type='number'
      />
      <RadioSelectInput
        placeholder={'預設自己'}
        name={'付款者'}
        clicked={handlePayerSelectClicked}
        labelStyle={styles.labelStyle}
        value={state.payer ? state.payer.displayName : null}
        type='number'
      />
      <CheckboxSelectInput
        placeholder={'所有人分'}
        name={'分款者'}
        changed={setPayer}
        clicked={handleOwersSelectClicked}
        selectAll={state.owers ? state.owers.length == users.length : false }
        value={state.owers ? state.owers : null}
        type='number'
      />
    </div>
  )
}

export default NewPaymentForm
