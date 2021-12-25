import React, { useEffect, useState } from 'react';
import styles from './CheckboxLabel.module.scss'
import { Checkbox } from '../index'
import { FontAwesomeIcon } from '../../index'
import { themeColors } from '../../../constants'

const CheckboxLabel = ({
  children,
  object,
  changed,
  checked,
  handleAddCoverCostUser,
  value
}) => {
  const [showCheckbox, setShowCheckbox] = useState(true)
  const coverCostOwerClicked = () => {
    setShowCheckbox(true)
    handleAddCoverCostUser(object.id)
  }

  useEffect(() => {
    setShowCheckbox(object.coverCost)

  }, object)

  return (
    <label className={styles.label}>
      {children}
      {
      showCheckbox ?
          <Checkbox
            value={value}
            changed={changed}
            checked={checked}
          /> :
          <div style={_styles.icon} onClick={coverCostOwerClicked}>
            <FontAwesomeIcon faicon="faPlus" style={{ color: themeColors.gold700 }}/>
          </div>

      }
    </label>
  )
};

const _styles = {
  icon: {
    width: '18px',
    height: '18px',
    display: 'flex',
    justifyContent: 'center',
  }
}

export default CheckboxLabel
