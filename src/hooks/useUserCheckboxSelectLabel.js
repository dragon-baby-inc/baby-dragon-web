import React, { useState, useEffect } from 'react'
import {
  UserCheckboxSelectLabel
} from '../components'

const useUserCheckboxSelectLabel = ({
  users,
  initialValue,
  key
}) => {
  const [_users, setUsers] = useState(initialValue)

  useEffect(() => {
    if (initialValue.length > 0) {
      setUsers(initialValue)
    }
  }, [initialValue])

  const handleUsersSelect = (objects) => {
    setUsers(objects)
  }

  const selectLabel = <UserCheckboxSelectLabel
    key={key}
    users={users}
    callback={handleUsersSelect}
    selectedObjects={_users}
  />

    return [_users, selectLabel];
}

export default useUserCheckboxSelectLabel;
