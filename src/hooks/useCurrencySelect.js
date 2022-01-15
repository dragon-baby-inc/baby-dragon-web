import React, { useState, useEffect } from "react"
import { RadioSelect, Image, RadioLabel, Svg } from '../components'

const currencies = [
  { id: "TWD", name: "TWD", displayName: "台幣", src: 'TwFlag' },
  { id: 'USD', name: "USD", displayName: "美金", src: 'UsFlag' },
  { id: 'HKD', name: "HKD", displayName: "港幣", src: 'HkFlag' },
  { id: 'JPY', name: "JPY", displayName: "日幣", src: 'JpFlag' },
  { id: 'EUR', name: "EUR", displayName: "歐元", src: 'EuFlag'  },
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
        <div style={{ paddingRight: '12px' }}>
          <div style={{ width: '40px', height: '40px', overflow: 'hidden', borderRadius: '50%' }}>
            <Svg icon={object.src} size='40'/>
          </div>
        </div>
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
