import React, { useRef, useEffect, useState } from 'react';
import styles from './CheckboxLabel.module.scss'
import { Checkbox } from '../index'
import { FontAwesomeIcon, Image, Svg } from '../../index'
import { themeColors } from '../../../constants'
import {
  userImageUrls
} from '../../../constants'

import { evaluate } from 'mathjs'
import { round } from '../../../utilities/Calculator'

const OwerCheckboxLabel = ({
  exponent,
  fixedAmount,
  valid,
  children,
  amount,
  object,
  changed,
  inputChanged,
  checked,
  handleAddCoverCostUser,
  value
}) => {
  const [_amount, setAmount] = useState(amount)
  const [settle, setSettle] = useState(true)
  const [_valid, setValid] = useState(true)
  const inputRef = useRef(null)

  useEffect(() => {
    if (fixedAmount) {
      if (amount > fixedAmount) {
        setValid(false)
      }
    } else {
      let [valid, _] = checkValid(amount)
      setValid(valid)
    }
  }, [amount])

  useEffect(() => {
    if (fixedAmount && value > fixedAmount) {
      setValid(false)
    }

    setAmount(amount)
  }, [])

  const checkValid = (value) => {
    let isValid = false

    if (value === '' || value === null) {
      isValid = true
      return [isValid, 0]
    }

    try {
      value = evaluate(value)
      if (value >= 0 ) {
        isValid = true
      } else {
        isValid = false
      }
    } catch {
      value = 0
      isValid = false
    }

    return [isValid, round(value, exponent)]
  }

  useEffect(() => {
    if (settle) {
      setAmount(amount)
      let [valid, _] = checkValid(amount)
      setValid(valid)
    }
  }, [amount])

  const handleCheckboxChanged = (e) => {
    if (e.target.checked) {
    } else {
      setAmount('')
    }

    changed(e)
  }

  const handleInputChanged = (e) => {
    setSettle(false)

    let [valid, value] = checkValid(e.target.value)

    setValid(valid)
    setAmount(e.target.value)
    inputChanged(e, object.id, value)
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handeInputBlur()
    }
  }

  let imageUrl = object.imageURL
  if (!imageUrl) {
    imageUrl = userImageUrls[object.imageId]
  }

  const handeInputBlur = () => {
    let value;

    try {
      value = evaluate(_amount)
      setValid(true)
    } catch {
      setValid(false)
      value = 0
    }

    if (fixedAmount) {
      if (value > fixedAmount) {
        setValid(false)
      }
    }

    if (value < 0) {
      value = 0
    }

    value = round(value, exponent)

    setAmount(value)
    inputChanged(null, object.id, value)
    setSettle(true)
  }

  const handleEditClicked = () => {
    inputRef.current.focus()
  }

  return (
    <div className={[styles.label, styles.owerLabel].join(' ')}>
      <label style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px' }}>
        <Checkbox
          style={{ paddingRight: '12px' }}
          value={value}
          changed={handleCheckboxChanged}
          checked={checked}
        />
        <Image style={{ paddingRight: '12px' }} imageUrl={imageUrl} defaultImage='user'/>
      </label>
      <div className={styles.flexCenter}>
        <div className={styles.flexColumn}>
          <div className={styles.displayName}>
            {object.displayName}
          </div>
          <div className={[styles.inputWrapper, _valid ? '' : styles.inputInValid].join(' ')}>
            <input
              ref={inputRef}
              onBlur={handeInputBlur}
              className={styles.input}
              type="text"
              placeholder="輸入算式或金額"
              value={_amount === undefined ? '': _amount}
              onKeyPress={handleKeyUp}
              onChange={handleInputChanged}/>
            <Svg
              clicked={handleEditClicked}
              className={_valid ? 'gray700' : 'invalid'}
              style={{
                marginBottom: '1px',
                fontSize: '15px'
              }}
              icon='texting'
              size='24'/>

          </div>
        </div>
      </div>
    </div>
  )
};

const _styles = {
  icon: {
    width: '18px',
    height: '18px',
    display: 'flex',
    justifyContent: 'center',
  }
}

export default OwerCheckboxLabel
