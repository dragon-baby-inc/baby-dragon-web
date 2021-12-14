import React from 'react'
import {
  RadioLabel,
  CheckboxLabel,
  FontAwesomeIcon,
  Image
} from '../components'

const createUserRadioLabel = ({ object, handleChange, selectedObject }) => {
  return <RadioLabel
    key={object.id}
    object={object}
    value={object.id}
    checked={selectedObject ? selectedObject.id === String(object.id) : null}
    changed={handleChange}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Image style={{ paddingRight: '12px' }} imageUrl={object.imageURL}/>
      {object.displayName}
    </div>
  </RadioLabel>
}

const createOwerCheckbokLabel = ({ object, handleChange, selectedObjects }) => {
  return <CheckboxLabel
    key={object.id}
    object={object}
    changed={handleChange}
    value={object.id}
    checked={selectedObjects.map(el => el.id).includes(object.id)} >
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Image style={{ paddingRight: '12px' }} imageUrl={object.imageURL}/>
      {object.displayName}
    </div>
  </CheckboxLabel>
}

const createUserCheckbokLabel = ({ handleEdit, handleTrash }) => ({ object, handleChange, selectedObjects }) => {
  return <CheckboxLabel
    key={object.id}
    object={object}
    changed={handleChange}
    value={object.id}
    checked={selectedObjects.map(el => el.id).includes(object.id)} >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ paddingRight: '12px' }} imageUrl={object.imageURL} size='56px'/>
        {object.displayName}
      </div>
      <div>
        {
          object.fromLine ? null :
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '20px' }} onClick={(e) => handleEdit(e, object)}>
                <FontAwesomeIcon faicon="faEdit" style={{color: '#6F6F6F'}}/>
              </div>
              {
                object.restrictedDestroy ?
                  null
                :
                 <div style={{ marginRight: '20px' }} onClick={(e) => handleTrash(e, object)}>
                   <FontAwesomeIcon faicon="faTrash" style={{color: '#6F6F6F'}}/>
                 </div>
              }
            </div>
        }
      </div>
    </div>
  </CheckboxLabel>
}

export {
  createUserRadioLabel,
  createUserCheckbokLabel,
  createOwerCheckbokLabel
}
