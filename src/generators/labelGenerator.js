import React from 'react'
import {
  RadioLabel,
  CheckboxLabel,
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

const createUserCheckbokLabel = ({ object, handleChange, selectedObjects }) => {
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

export {
  createUserRadioLabel,
  createUserCheckbokLabel
}
