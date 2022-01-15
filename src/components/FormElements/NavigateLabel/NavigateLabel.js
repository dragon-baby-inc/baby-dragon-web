import React from 'react';
import styles from './NavigateLabel.module.scss';
import { Svg } from '../../index'
import { themeColors } from '../../../constants'

const navigateLabel = ({
  clicked,
  disabled,
  hideIcon,
  description,
  selectedOptionName,
  name
}) => {
  return (
    <label className={styles.label} onClick={disabled ? () => {} : clicked}>
      {description}
      <div className={styles.rightContainer}>
        {selectedOptionName}
        {
          hideIcon ?
            null:
            <Svg icon='rightArrow' size='24' className='gray900'/>
        }
      </div>
    </label>
  );
};

export default navigateLabel;
