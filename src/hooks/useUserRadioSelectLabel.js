import React, { useState, useEffect } from 'react'
import {
  UserRadioSelectLabel
} from '../components'

const useUserRadioSelectLabel = ({
  users,
  initialValue,
  callback,
  key
}) => {
  const [user, setUser] = useState(initialValue)

  useEffect(() => {
    setUser(initialValue)
  }, initialValue)

  const handleUserSelect = (object) => {
    setUser(object)
    if (callback) { callback(object) }
  }

  const selectLabel = <UserRadioSelectLabel
    key={key}
    users={users}
    callback={handleUserSelect}
    user={user}
    initialValue={user}
  />

    return [user, selectLabel];
}

export default useUserRadioSelectLabel;
