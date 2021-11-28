import React, { useState, useEffect } from "react"
import { useUsers } from './'
import {
  CheckboxSelect,
  CheckboxLabel,
  Image
} from '../components'

const useUsersSelect = ({
  users,
  buildSelectUsers,
  callback
}) => {
  const [_selectObjectIds, setSelectObjectIds] = useState()

  useEffect(() => {
    setSelectObjectIds(buildSelectUsers(users))
  }, [users])

  const handleSelectChanged = (objects) => {
    setSelectObjectIds(objects.map(obj => obj.id))
    if (callback) { callback(objects.map(obj => obj.id)) }
  }

  const createLabel = ({ object, handleChange, selectedObjects }) => {
    return <CheckboxLabel
      key={object.id}
      object={object}
      changed={handleChange}
      value={object.id}
      checked={selectedObjects.map(el => el.id).includes(object.id)} >
      <div style={styles.label}>
        <Image style={{ paddingRight: '12px' }} imageUrl={object.imageURL}/>
        {object.displayName}
      </div>
    </CheckboxLabel>
  }

  const select = <CheckboxSelect
    createLabel={createLabel}
    objects={users}
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
