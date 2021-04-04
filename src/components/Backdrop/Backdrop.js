import React from 'react';
import styles from './Backdrop.module.scss'

const backdrop = (props) => {
  return (
    <div className={[styles.backdrop].join(' ')} onClick={props.clicked}> </div>
  )
};

export default backdrop;
