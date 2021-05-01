import React from "react"
import styles from './Button.module.scss'

function Button({ children, disabled, clicked, btnClass}){
  return(
    <button disabled={disabled} onClick={clicked} className={[styles.button, btnClass].join(' ')}>{children}</button>
    )
}

export default Button
