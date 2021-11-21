import React from 'react';
import styles from './ActionLabel.module.scss';
import { FontAwesomeIcon } from '../../index'
import { themeColors } from '../../../constants'

const actionLabel = ({
  clicked,
  description,
  name,
  style,
}) => {
  return (
    <label className={styles.label} onClick={clicked} style={style ? style : {}}>
      {description}
    </label>
  );
};

export default actionLabel;
