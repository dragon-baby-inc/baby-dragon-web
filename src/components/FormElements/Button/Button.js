import React from "react"
import styles from './Button.module.scss'

function Button({ style, children, disabled, clicked, btnClass}){
  return(
    <button style={style} disabled={disabled} onClick={clicked} className={[styles.button, btnClass].join(' ')}>{children}</button>
    )
}

export default Button
