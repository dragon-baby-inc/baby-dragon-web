import React from "react"
import Loader from "react-spinners/SyncLoader";
import { themeColors } from '../../constants'
import styles from './FullPageLoader.module.scss'

function FullPageLoader(){
  return(
    <div className={styles.container}>
      <Loader color={themeColors.gray500}/>
    </div>
  )
}

export default FullPageLoader
