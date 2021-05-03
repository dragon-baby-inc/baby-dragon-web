import React, { useContext } from "react"
import styles from './FilterPaymentForm.module.scss'
import AmountInput from '../../FormElements/AmountInput/AmountInput'
import TextInput from '../../FormElements/TextInput/TextInput'
import { Context as FilterContext } from '../../../contexts/FilterPaymentContext'

const FilterPaymentForm = ({
  labelType,
  objects,
  selected_objects,
  changed
}) => {
  const { state } = useContext(FilterContext)
  console.log(state)

  const handleInputChange = (id, amount) => {
    console.log('change')
  }

  return(
    <div className={styles.container}>
      <form>
        <TextInput
          disabled={false}
          placeholder={'輸入關鍵字'}
          changed={handleInputChange}
          name={'名稱'}
          labelStyle={styles.labelStyle}
          valid={true}
          invalidFeedback="*不可為空白，12字內"
          type='text'
        />
      </form>
    </div>
  )
}

export default FilterPaymentForm
