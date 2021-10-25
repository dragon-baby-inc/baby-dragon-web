import React from 'react';
import styles from './Backdrop.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/fontawesome-free-solid'
import { faTimes } from '@fortawesome/fontawesome-free-solid'

const icons = {
  faCheck: faCheck,
  faTimes: faTimes
}

const backdrop = (props) => {
  let icon = props.icon
  if (!icon) { icon = 'faCheck' }
  return (
    <div className={[styles.backdrop].join(' ')} onClick={props.clicked}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={icons[icon]} color='#eeeeee'/>
      </div>
    </div>
  )
};

export default backdrop;
