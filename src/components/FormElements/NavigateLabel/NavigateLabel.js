import React from 'react';
import styles from './NavigateLabel.module.scss';
import { FontAwesomeIcon } from '../../index'
import { themeColors } from '../../../constants'

const navigateLabel = ({
  clicked,
  hideIcon,
  description,
  selectedOptionName,
  name
}) => {
  return (
    <label className={styles.label} onClick={hideIcon ? () => {} : clicked}>
      {description}
      <div className={styles.rightContainer}>
        {selectedOptionName}
        {
          hideIcon ?
            null:
            <FontAwesomeIcon
              style={{ fontSize: "15px", margin: "0px 15px", marginRight: "0px" }}
              faicon='faChevronRight'
              color={themeColors.gray900}/>
        }
      </div>
    </label>
  );
};

export default navigateLabel;
