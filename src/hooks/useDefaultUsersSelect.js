import React, { useState, useEffect } from "react"
import { useUsers } from './'
import {
  DefaultUsersCheckboxSelect,
  CheckboxLabel,
  Image
} from '../components'
import {
  createUserCheckbokLabel
} from '../generators/labelGenerator'

const useUsersSelect = ({
  users,
  handleEdit,
  handleAddUser,
  handleTrash,
  labelsHeight,
  warning,
  buildSelectUsers,
  createLabel,
  filterDisabled,
  style,
  selectAll,
  callback
}) => {
  const [_selectObjectIds, setSelectObjectIds] = useState([])
  const [lastUsersLength, setLastUsersLength] = useState(0)

  useEffect(() => {
    if (_selectObjectIds.length === 0 || users.length != lastUsersLength) {
      setSelectObjectIds(buildSelectUsers(users))
      setLastUsersLength(users.length)
    }
  }, [users])

  const handleSelectChanged = (objects) => {
    setSelectObjectIds(objects.map(obj => obj.id))
    if (callback) { callback(objects.map(obj => obj.id)) }
  }

  const select = <DefaultUsersCheckboxSelect
    labelsHeight={labelsHeight}
    handleAddUser={handleAddUser}
    warning={warning}
    filterDisabled={filterDisabled}
    createLabel={createLabel({ handleEdit, handleTrash })}
    selectAll={selectAll}
    objects={users}
    style={style}
    selected_object_ids={_selectObjectIds}
    changed={handleSelectChanged}
  />

  return [_selectObjectIds, select];
}

export default useUsersSelect;

const styles = {
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}
