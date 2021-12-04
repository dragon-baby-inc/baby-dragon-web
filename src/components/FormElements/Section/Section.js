import React from 'react';
import styles from './Section.module.scss';

const section = ({
  name,
  style
}) => {
  return (
    <div style={style ? style: {}} className={styles.container}>
      {name}
    </div>
  );
};

export default section;
