import React, {useState} from "react"
import { themeColors } from '../../constants/globalColors'

const styles = {
  bg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
  },
  message: {
    color: themeColors.gold700,
    fontWeight: 450,
  }
}
function EmptyResult({ message }){
  return(
    <div style={styles.bg}>
      <p style={styles.message}>{message}</p>
    </div>
    )
}

export default EmptyResult
