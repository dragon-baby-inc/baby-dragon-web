import React from 'react'
import {
  Svg,
  RadioLabel,
  CheckboxLabel,
  FontAwesomeIcon,
  OwerCheckboxLabel,
  Image
} from '../components'
import {
  userImageUrls
} from '../constants'

const createUserRadioLabel = ({ object, handleChange, selectedObject }) => {
  let imageUrl = object.imageURL
  if (!imageUrl) {
    imageUrl = userImageUrls[object.imageId]
  }
  return <RadioLabel
    key={object.id}
    object={object}
    value={object.id}
    checked={selectedObject ? selectedObject.id === String(object.id) : null}
    changed={handleChange}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Image style={{ paddingRight: '12px' }} imageUrl={imageUrl} defaultImage='user'/>
      {object.displayName}
    </div>
  </RadioLabel>
}

const createEditableOwerCheckbokLabel = ({ fixedAmount, object, handleChange, selectedObjects, handleInputChanged, amount, valid }) => {
  return <OwerCheckboxLabel
    fixedAmount={fixedAmount}
    hideCheckbox={!object.coverCost}
    amount={amount}
    valid={valid}
    key={object.id}
    object={object}
    inputChanged={handleInputChanged}
    changed={handleChange}
    value={object.id}
    checked={selectedObjects.map(el => el.id).includes(object.id)} >
  </OwerCheckboxLabel>
}

const createOwerCheckbokLabel = ({ object, handleChange, selectedObjects, handleAddCoverCostUser }) => {
  let imageUrl = object.imageURL
  if (!imageUrl) {
    imageUrl = userImageUrls[object.imageId]
  }
  return <OwerCheckboxLabel
    handleAddCoverCostUser={handleAddCoverCostUser}
    hideCheckbox={!object.coverCost}
    key={object.id}
    object={object}
    changed={handleChange}
    value={object.id}
    checked={selectedObjects.map(el => el.id).includes(object.id)} >
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Image style={{ paddingRight: '12px' }} imageUrl={imageUrl} defaultImage='user'/>
      {object.displayName}
    </div>
  </OwerCheckboxLabel>
}

const createUserCheckbokLabel = ({ handleEdit, handleTrash }) => ({ object, handleChange, selectedObjects }) => {
  let imageUrl = object.imageURL
  if (!imageUrl) {
    imageUrl = userImageUrls[object.imageId]
  }

  let restrictedCoverCost = object.restrictedCoverCost
  if (object.restrictedCoverCost == true && object.coverCost == false) {
    restrictedCoverCost = false
  }

  return <CheckboxLabel
    disabled={restrictedCoverCost}
    key={object.id}
    object={object}
    changed={handleChange}
    value={object.id}
    checked={selectedObjects.map(el => el.id).includes(object.id)} >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ paddingRight: '12px' }} imageUrl={imageUrl} size='56px' defaultImage='user'/>
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

const createFreeUserCheckbokLabel = ({ handleEdit, handleTrash }) => ({ object, handleChange, selectedObjects }) => {
  let imageUrl = object.imageURL
  if (!imageUrl) {
    imageUrl = userImageUrls[object.imageId]
  }

  return <CheckboxLabel
    key={object.id}
    object={object}
    changed={handleChange}
    value={object.id}
    checked={selectedObjects.map(el => el.id).includes(object.id)} >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ paddingRight: '12px' }} imageUrl={imageUrl} size='56px' defaultImage='user'/>
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
  createOwerCheckbokLabel,
  createFreeUserCheckbokLabel,
  createEditableOwerCheckbokLabel,
}
