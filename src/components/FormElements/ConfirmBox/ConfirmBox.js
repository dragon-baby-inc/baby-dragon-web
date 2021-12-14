import React from 'react'
import styles from './ConfirmBox.module.scss'
import {
  Backdrop,
  Separater,
} from '../../../components'

const ConfirmBox = ({
  title,
  children,
  confirmed,
  canceled ,
  confirm_text,
  cancel_text,
}) => {
  const handleCanceled = (e) => {
    canceled()
    e.preventDefault()
  }
  const handleConfirmed = () => {
    confirmed()
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.children}>
          {children}
        </div>
        <Separater style={{margin: "0px"}}/>
        <div className={styles.btnGroup}>
          <button className={[styles.button, styles.cancel].join(" ")} onClick={handleCanceled}>
            {cancel_text ? cancel_text: "取消"}
          </button>
          <button className={[styles.button, styles.confirm].join(" ")} onClick={handleConfirmed}>
            {confirm_text ? confirm_text: "確認"}
          </button>
        </div>
      </div>
      <Backdrop clicked={handleCanceled}/>
    </>
  )
}

export default ConfirmBox
