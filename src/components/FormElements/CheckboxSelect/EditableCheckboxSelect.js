import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import styles from './CheckboxFilterSelect.module.scss'
import { split_into } from '../../../utilities/Calculator';
import {
  Warning,
  CheckboxLabel,
  Separater,
} from '../index'

import { evaluate } from 'mathjs'

const EditableCheckboxSelect = ({
  setSummaryAmount,
  exponent,
  setManualOwers,
  getManualOwersAmount,
  setOwerAmount,
  owers,
  objects,
  fixedAmount,
  selected_object_ids,
  handleAddCoverCostUser,
  handleNavigateUsers,
  style,
  createLabel,
  selectAll,
  changed,
  closed
}) => {
  const [mount, setMount] = useState(false) /* eslint-disable no-unused-vars */
  const [_selectAll, setSelectAll] = useState(true)
  const [selectedObjects, setSelectedObjects] = useState([])
  const { group_id, accounting_book_id } = useParams()
  const [_owers, _setOwers] = useState(owers)

  const debug = false
  const setOwers = (newOwers) => {
    if (debug) { console.log(newOwers) }
    _setOwers(newOwers)
    setManualOwers(newOwers)
  }

  useEffect(() => {
    setMount(true)
    if (selected_object_ids.length === selectedObjects.length) {
      setSelectAll(objects.length === selected_object_ids.length)
      return
    }

    setSelectedObjects(objects.filter(el => selected_object_ids.includes(el.id)))
    setSelectAll(objects.length === selected_object_ids.length)
  }, [objects, selected_object_ids])

  let handleChange = (e) => {
    let selected_objects = selectedObjects
    if (e.target.checked) {
      selectObject(e.target.value)
    } else {
      deSelectObject(e.target.value)
      setAmount(e.target.value, null)
    }
  }

  const setManualOwersAmount = (owers, totalAmount) => {
    let newOwers = getManualOwersAmount(objects, owers, getUnTouchedIds(_owers.value, selectedObjects), totalAmount)
    setOwers(newOwers.state)
  }

  const handleInputChanged = (e, object_id, value) => {
    let _selectedObjects = [...selectedObjects]

    if (!_selectedObjects.map(o => o.id).includes(object_id)) {
      if (value && value > 0) {
        selectObject(object_id)
      }
    }

    if (value <= 0) {
      deSelectObject(object_id)
      _selectedObjects = _selectedObjects.filter(o => o.id !== object_id)
    }

    setAmount(object_id, value)

    let newOwers = [..._owers.value]

    newOwers = newOwers.map(o => {
      if (o.user.id === object_id) {
        if (value > 0) {
          o.touched = true
          o.valid = fixedAmount ? value <= fixedAmount : true
          o.amount = value
        } else {
          o.touched = false
          o.valid = false
          o.amount = value
        }
      }

      return o
    })

    if (fixedAmount) {
      newOwers = setOwerAvergedTouchedAmount(newOwers, _selectedObjects)
    }

    setOwers({
      value: newOwers,
      valid: true
    })
  }

  const setOwerAvergedTouchedAmount = (newOwers, selectedObjects) => {
    let unTouchedIds = getUnTouchedIds(newOwers, selectedObjects)
    let touchedIds = getTouchedIds(newOwers, selectedObjects)

    let touchedAmount = newOwers.reduce(function (previousValue, ower) {
      if (touchedIds.includes(ower.user.id)) {
        if (ower.amount < 0) {
          return previousValue
        } else if (ower.amount) {
          return previousValue + parseFloat(ower.amount)
        } else {
          return previousValue
        }
      } else {
        return previousValue
      }
    }, 0)

    let remainAmount = fixedAmount - touchedAmount
    if (debug) {
      console.log(`touchedAmount: ${touchedAmount}`)
      console.log(`remainAmount: ${remainAmount}`)
    }

    if (remainAmount > 0) {
      let amountArray = getManualOwersAmount(
        objects,
        newOwers.filter(o => unTouchedIds.includes(o.user.id)).map(o => o.user.id),
        unTouchedIds,
        remainAmount
      ).splits
      let i = 0

      newOwers = newOwers.map(o => {
        if (unTouchedIds.includes(o.user.id)) {
          o.amount = amountArray[i]
          i++
        }

        if (!selectedObjects.map(o => o.id).includes(o.user.id)) {
          o.amount = ''
        }
        return o
      })
    } else if (remainAmount <= 0) {
      newOwers = newOwers.map(o => {
        if (unTouchedIds.includes(o.user.id)) {
          o.amount = 0
        }

        if (!selectedObjects.map(o => o.id).includes(o.user.id)) {
          o.amount = ''
        }

        return o
      })

    }

    return newOwers
  }

  const getUnTouchedIds = (owers, selectedObjects) => {
    let selectedObjectIds = selectedObjects.map(o => o.id)
    return owers.filter(o => !o.touched).map(o => o.user.id).filter(id => selectedObjectIds.includes(id))
  }

  const getTouchedIds = (owers, selectedObjects) => {
    let selectedObjectIds= selectedObjects.map(o => o.id)
    return owers.filter(o => o.touched).map(o => o.user.id).filter(id => selectedObjectIds.includes(id))
  }

  const setAmount = (object_id, value) => {
    setOwerAmount(object_id, value)
  }

  const selectObject = (object_id) => {
    let selected_objects = selectedObjects
    selected_objects.push(...objects.filter(object => String(object.id) === String(object_id)))

    setSelectedObjects(selected_objects)
    changed(selected_objects)

    let touchedIds = getTouchedIds(_owers.value, selected_objects)

    if (touchedIds.length > 0) {
      let newOwers = setOwerAvergedTouchedAmount(_owers.value, selected_objects)
      setOwers({ value: newOwers, valid: true })
    } else {
      setManualOwersAmount(selected_objects, fixedAmount)
    }
  }

  const deSelectObject = (object_id) => {
    let selected_objects = selectedObjects
    selected_objects = selected_objects.filter(object => String(object.id) !== String(object_id))

    setSelectedObjects(selected_objects)
    changed(selected_objects)

    let newOwers = [..._owers.value]
    newOwers = newOwers.map(o => {
      if (object_id === o.user.id) {
        o.touched = false
        o.amount = ''
      }

      return o
    })

    let touchedIds = getTouchedIds(newOwers, selected_objects)

    if (touchedIds.length > 0) {
      let newOwers = setOwerAvergedTouchedAmount(_owers.value, selected_objects)
      setOwers({ value: newOwers, valid: true })
    } else {
      setManualOwersAmount(selected_objects, fixedAmount)
    }
  }

  let objectLabels = objects.map(object => {
    let ower = _owers.value.filter(o => o.user.id === object.id)[0]
    return createLabel({ object, fixedAmount, handleChange, selectedObjects, handleInputChanged, amount: ower.amount, valid: ower.valid })
  })

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked)

    if (e.target.checked) {
      setSelectedObjects(objects)
      changed(objects)
      setManualOwersAmount(objects, fixedAmount)
    } else {
      setSelectedObjects([])
      changed([])

      let newOwers = [...owers.value]
      newOwers = newOwers.map(o => {
        o.amount = ''
        return o
      })

      setOwers({
        value: newOwers,
        valid: true
      })
    }
  }

  let summaryAmount = _owers.value.reduce(function (previousValue, ower) {
    try {
      if (evaluate(ower.amount) > 0) {
        if (ower.amount) {
          return previousValue + ower.amount
        } else {
          return previousValue
        }
      } else {
        return previousValue
      }
    } catch {
      return previousValue
    }
  }, 0).toFixed(exponent)

  setSummaryAmount(summaryAmount)

  const handleClosed = () => {
    let validManualOwersIds = _owers.value.filter(o => o.amount !== null && o.amount !== '' && o.amount > 0).map(o => o.user.id)
    let selected_objects = objects.filter(u => validManualOwersIds.includes(u.id))
    setSelectedObjects(selected_objects)
    changed(selected_objects)
    closed()
  }

  const containerStyles = [styles.container]
  if (mount) { containerStyles.push(styles.mount) }
  return(
    <div style={style ? style: {}} className={containerStyles.join(' ')}>
      {
        selectAll ?
          <>
            <div className={styles.header}>
              <div className={styles.headerLabel}>
                <div>
                  分款者
                </div>
                <div className={styles.summary}>
                  <div className={styles.summaryAmount}>
                    小計: {summaryAmount} { fixedAmount > 0 ? '/' : '' }
                  </div>
                  {
                    fixedAmount > 0 ?
                      <div className={styles.remainAmount}>
                        剩餘：{ fixedAmount - summaryAmount }
                      </div> : null
                  }
                </div>
              </div>
              <div className={styles.checkboxClose} onClick={handleClosed}>
                完成
              </div>
            </div>
            <Separater style={{ padding: 0, margin: 0 }}/>
            <CheckboxLabel
              value="select-all"
              childrenRight={true}
              changed={handleSelectAll}
              checked={_selectAll}
            >
              <div className={styles.selectAll}>
                所有人
              </div>
            </CheckboxLabel >
          </>
          : null
      }
      <div className={styles.labels}>
        {objectLabels}
        <Warning style={{ backgroundColor: '#ffffff', paddingBottom: '26px' }}>
          <>
            找不到成員？去
            <a
              style={{color: '#88631C', textDecoration: 'underline'}}
              href={`/liff_entry/groups/${group_id}/accounting_books/${accounting_book_id}/default_users`}>
              分帳成員
            </a>
            設定看看喔！
          </>
        </Warning>

      </div>
    </div>
  )
}

export default EditableCheckboxSelect
