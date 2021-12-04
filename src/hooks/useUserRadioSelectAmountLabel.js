import React, { useState, useEffect } from 'react'
import { themeColors } from '../constants'
import {
  UserRadioSelectAmountLabel,
  Button,
} from '../components'

const useUserRadioSelectAmountLabel = ({
  users,
  owers,
  callback
}) => {
  const [_owers, setOwers] = useState([])
  const [forceDrawerActive, setForceDrawerActive] = useState(null)

  useEffect(() => {
    if (owers){
      setOwers(owers)
    }
  }, [users])

  const handleOwersChanged = (index, value) => {
    let newOwers = [..._owers]
    newOwers[index] = value
    setOwers(newOwers)
    if (callback) { callback(newOwers) }
  }

  const handleAddOwer = () => {
    let newOwers = [..._owers]
    newOwers.push({ user: users[0], amount: null })
    setOwers(newOwers)
    setForceDrawerActive(newOwers.length - 1)
  }

  const handleLabelDelete = (index) => {
    let newOwers = [..._owers]
    if (newOwers.length === 1) {
      return
    }
    newOwers.splice(index, 1)
    setOwers(newOwers)
  }

  let i = -1
  const labels = _owers.map(ower => {
    i++
    return <UserRadioSelectAmountLabel
      index={i}
      forceDrawerActive={forceDrawerActive ? forceDrawerActive === i : false}
      deleteActive={_owers.length > 1}
      deleted={handleLabelDelete}
      key={i}
      users={users}
      amount={ower.amount}
      user={ower.user}
      callback={handleOwersChanged}
    />
  })

  const select = <>
    {labels}
    <Button
      color="gold"
      clicked={handleAddOwer}
      style={{
        color: themeColors.gold900
      }}>
      新增</Button>
  </>

    return [_owers, select];
}

export default useUserRadioSelectAmountLabel;
