import React, { useState } from "react"
import styles from './RadioSelectMenu.module.scss'
import UserRadioLabel from '../../FormElements/UserRadioLabel/UserRadioLabel'
import SearchInput from '../../FormElements/SearchInput/SearchInput'

const RadioSelectMenu = ({ objects }) => {
  return(
    <div className={styles.container}>
      <SearchInput />
      <UserRadioLabel object={{ id: 123, displayName: 'test' }}/>
      <UserRadioLabel object={{ id: 123, displayName: 'test' }}/>
    </div>
    )
}

export default RadioSelectMenu
