import React, { useState, useEffect } from "react"
import { useUsers } from './'
import {
  CheckboxSelect,
  CheckboxLabel,
  CheckboxFilterSelect,
  Image
} from '../components'
import {
  createUserCheckbokLabel
} from '../generators/labelGenerator'

const useUsersFilterSelect = ({
  users,
  buildSelectUsers,
  selectedObjects,
  handleAddCoverCostUser,
  style,
  selectAll,
  callback,
  closed,
}) => {
  const [_selectObjectIds, setSelectObjectIds] = useState([])

  useEffect(() => {
    if (selectedObjects) {
      setSelectObjectIds(users.filter(u => {
      return selectedObjects.map(su => su.id).includes(u.id)
    }))
    } else {
      setSelectObjectIds(buildSelectUsers(users))
    }
  }, [users, selectedObjects])

  const handleSelectChanged = (objects) => {
    setSelectObjectIds(objects.map(obj => obj.id))
    if (callback) { callback(objects.map(obj => obj.id)) }
  }

  const select = <CheckboxFilterSelect
    handleAddCoverCostUser={handleAddCoverCostUser}
    closed={closed}
    createLabel={createUserCheckbokLabel}
    selectAll={selectAll}
    objects={users}
    style={style}
    selected_object_ids={_selectObjectIds}
    changed={handleSelectChanged}
  />

  return [_selectObjectIds, select];
}

export default useUsersFilterSelect;

const styles = {
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}
