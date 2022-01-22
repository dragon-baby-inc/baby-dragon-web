import React from 'react';
import styles from './Section.module.scss';

const section = ({
  name,
  children,
  style
}) => {
  return (
    <div style={style ? style: {}} className={styles.container}>
      {name}
      <div className={styles.lint}>
        {children}
      </div>
    </div>
  );
};

export default section;
