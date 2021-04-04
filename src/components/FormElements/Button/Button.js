import React from "react"
import styles from './Button.module.scss'

function Button({ children, disabled, clicked }){
  return(
    <button disabled={disabled} onClick={clicked} className={styles.button}>{children}</button>
    )
}

export default Button
