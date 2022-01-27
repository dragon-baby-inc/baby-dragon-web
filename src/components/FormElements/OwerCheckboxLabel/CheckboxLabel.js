import React, { useRef, useEffect, useState } from 'react';
import styles from './CheckboxLabel.module.scss'
import { Checkbox } from '../index'
import { FontAwesomeIcon, Image, Svg } from '../../index'
import { themeColors } from '../../../constants'
import {
  userImageUrls
} from '../../../constants'

import { evaluate } from 'mathjs'

const OwerCheckboxLabel = ({
  children,
  amount,
  object,
  changed,
  inputChanged,
  checked,
  handleAddCoverCostUser,
  value
}) => {
  const [showCheckbox, setShowCheckbox] = useState(true)
  const [_amount, setAmount] = useState(amount)
  const [settle, setSettle] = useState(true)
  const [valid, setValid] = useState(true)

  useEffect(() => {
    if (amount) {
      try {
        evaluate(amount)
      } catch {
        setValid(false)
      }
    }

    setAmount(amount)
  }, [])

  useEffect(() => {
    if (settle) {
      setAmount(amount)

      if (amount === '' || amount === null) {
        setValid(true)
        return
      }

      try {
        evaluate(amount)
        setValid(true)
      } catch {
        setValid(false)
      }
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

    let value

    try {
      value = evaluate(e.target.value)
      setValid(true)
    } catch {
      value = ''
    }

    setAmount(e.target.value)
    inputChanged(e, object.id, value)
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handeInputBlur()
    }
  }

  useEffect(() => {
    setShowCheckbox(object.coverCost)
  }, object)

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
      value = _amount
    }

    setAmount(value)
    inputChanged(null, object.id, value)
    setSettle(true)
  }

  return (
    <div className={styles.label}>
      <label>
        <Checkbox
          style={{ paddingRight: '12px' }}
          value={value}
          changed={handleCheckboxChanged}
          checked={checked}
        />
      </label>
      <div className={styles.flexCenter}>
        <Image style={{ paddingRight: '12px' }} imageUrl={imageUrl} defaultImage='user'/>
        <div className={styles.flexColumn}>
          <div className={styles.displayName}>
            {object.displayName}
          </div>
          <div className={[styles.inputWrapper, valid ? '' : styles.inputInValid].join(' ')}>
            <input
              onBlur={handeInputBlur}
              className={styles.input}
              type="text"
              placeholder="輸入算式或金額"
              value={_amount}
              onKeyPress={handleKeyUp}
              onChange={handleInputChanged}/>
            <Svg
              className={valid ? 'gray700' : 'invalid'}
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
