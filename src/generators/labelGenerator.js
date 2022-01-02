import React from 'react'
import {
  Svg,
  RadioLabel,
  CheckboxLabel,
  FontAwesomeIcon,
  OwerCheckboxLabel,
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
      <Image style={{ paddingRight: '12px' }} imageUrl={object.imageURL} defaultImage='user'/>
      {object.displayName}
    </div>
  </RadioLabel>
}

const createOwerCheckbokLabel = ({ object, handleChange, selectedObjects, handleAddCoverCostUser }) => {
  return <OwerCheckboxLabel
    handleAddCoverCostUser={handleAddCoverCostUser}
    hideCheckbox={!object.coverCost}
    key={object.id}
    object={object}
    changed={handleChange}
    value={object.id}
    checked={selectedObjects.map(el => el.id).includes(object.id)} >
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Image style={{ paddingRight: '12px' }} imageUrl={object.imageURL} defaultImage='user'/>
      {object.displayName}
    </div>
  </OwerCheckboxLabel>
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
        <Image style={{ paddingRight: '12px' }} imageUrl={object.imageURL} size='56px' defaultImage='user'/>
        {object.displayName}
      </div>
      <div>
        {
          object.fromLine ? null :
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: '20px' }} onClick={(e) => handleEdit(e, object)}>
                <Svg icon='edit' size='24' className='gray700'/>
              </div>
              {
                object.restrictedDestroy || !handleTrash ?
                  null
                :
                 <div style={{ marginRight: '20px' }} onClick={(e) => handleTrash(e, object)}>
                   <Svg icon='delete' size='24' className='gray700'/>
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
