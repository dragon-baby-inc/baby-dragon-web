import React, { useState, useEffect } from "react"
import { RadioSelect, Image, RadioLabel } from '../components'

const currencies = [
  { id: "TWD", name: "TWD", displayName: "台幣" },
  { id: 'USD', name: "USD", displayName: "美金" },
  { id: 'HKD', name: "HKD", displayName: "港幣" },
  { id: 'JPY', name: "JPY", displayName: "日幣" },
  { id: 'EUR', name: "EUR", displayName: "歐元" },
]

const useCurrencySelect = ({
  initialValue,
  callback
}) => {
  const [value, setValue] = useState((initialValue ? initialValue : ""));

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleSelectChange = (object) => {
    setValue(object.id)
    if (callback) { callback(object.id) }
  }

  const createLabel = ({ object, handleChange }) => {
    return <RadioLabel
      key={object.name}
      object={object}
      value={object.id}
      checked={value === String(object.id)}
      changed={handleChange}>
      <div style={styles.label}>
        <Image style={{ paddingRight: '12px' }}/>
        {object.name}
      </div>
    </RadioLabel>
  }

  const select = <RadioSelect
    createLabel={createLabel}
    objects={currencies}
    changed={handleSelectChange}
  />

    return [value, select, currencies];
}

export default useCurrencySelect;

const styles = {
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}
