import React from "react"
import { themeColors } from '../../constants/globalColors'
import emptyLogo from'../../assets/empty_page.png';

const styles = {
  bg: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column',
    alignItems: 'center',
    paddingTop: '10%',
    width: '100%',
    height: '80%',
  },
  message: {
    color: themeColors.gold700,
    paddingTop: '24px',
    fontWeight: 450,
    fontSize: '15px'
  },
  logo: {
    maxWidth: '160px'
  }
}
function EmptyResult({ message }){
  return(
    <div style={styles.bg}>
      <img  src={emptyLogo} style={styles.logo} alt="empty"/>

      <p style={styles.message}>{message}</p>
    </div>
    )
}

export default EmptyResult
