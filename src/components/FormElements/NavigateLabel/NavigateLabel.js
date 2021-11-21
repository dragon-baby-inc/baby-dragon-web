import React from 'react';
import styles from './NavigateLabel.module.scss';
import { FontAwesomeIcon } from '../../index'
import { themeColors } from '../../../constants'

const navigateLabel = ({
  clicked,
  description,
  selectedOptionName,
  name
}) => {
  return (
    <label className={styles.label} onClick={clicked}>
      {description}
      <div className={styles.rightContainer}>
        {selectedOptionName}
        <FontAwesomeIcon
          style={{ fontSize: "15px", margin: "0px 15px" }}
          faicon='faChevronRight'
          color={themeColors.gray900}/>
      </div>
    </label>
  );
};

export default navigateLabel;
