import React from 'react';
import styles from './SeparaterLabel.module.scss';

const separaterLabel = ({
  name,
  style
}) => {
  return (
    <div style={style ? style : {}} className={styles.container}>
      {name}
    </div>
  );
};

export default separaterLabel;
