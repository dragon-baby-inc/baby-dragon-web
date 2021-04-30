import React from 'react';
import styles from './Backdrop.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/fontawesome-free-solid'

const backdrop = (props) => {
  return (
    <div className={[styles.backdrop].join(' ')} onClick={props.clicked}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={faCheck} color='#eeeeee'/>
      </div>
    </div>
  )
};

export default backdrop;
