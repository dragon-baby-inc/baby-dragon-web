import React, { useContext } from "react"
import Toggle from '../FormElements/FormTypeToggle/Toggle'
import TextInput from '../FormElements/TextInput/TextInput'
import { Context } from '../../contexts/PaymentContext'

const styles = {
  labelStyle: {
    marginBottom: '12px',
  }
}

const NewPaymentForm = () => {
  const {
    state,
    setName,
    setAmount,
    setAllocationType
  } = useContext(Context)
  console.log(state)

  const handleToggleChanged = (e) => {
    if (e.target.checked) {
      setAllocationType('amount')
    } else {
      setAllocationType('evenly')
    }
  }
  const checked = state.allocation_type === 'evenly' ? false : true

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
        placeholder={'輸入金額'}
        name={'金額'}
        changed={setAmount}
        value={state.amount}
        type='number'
      />
    </div>
    )
}

export default NewPaymentForm
