import React from 'react';
import styles from './DisclaimerBox.module.scss';

const disclaimerBox = ({
  children,
  closed,
  style
}) => {
  return (
    <div style={style ? style: {}} className={styles.container}>
      <div className={styles.children}>
        {children}
      </div>
      <div className={styles.closed} onClick={closed}>
        ζη₯ιδΊ
      </div>
    </div>
  );
};

export default disclaimerBox;
