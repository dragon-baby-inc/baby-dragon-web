import React from 'react'
import {
  RadioLabel,
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

export {
  createUserRadioLabel
}
