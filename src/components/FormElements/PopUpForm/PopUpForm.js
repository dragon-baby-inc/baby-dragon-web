import React from "react"
import styles from './PopUpForm.module.scss'
import AmountInput from '../AmountInput/AmountInput'

const PopUpForm = ({
  labelType,
  objects,
  selected_objects,
  changed
}) => {

  const handleInputChange = (id, amount) => {
    console.log(id)
    console.log(amount)
    let updatedObjects = objects.map(object => {
      if (object.id == id) {
        object.amount = amount
      }
      return object
    })
    console.log(updatedObjects)
    changed(updatedObjects)
  }

  let labelClasses = [styles.label]
  let inputs = objects.map(object => {
    return <div>
      <AmountInput
        placeholder={'輸入金額'}
        userImage={object.imageURL}
        name={object.displayName}
        id={object.id}
        changed={handleInputChange}
        type='number'
        hideLabel={true}
        value={object.amount}
        valid={object.amount}
        invalidFeedback="*不可為空白，12字內"
      />
      </div>
  })

  return(
    <div className={styles.container}>
      {inputs}
    </div>
  )
}

export default PopUpForm
