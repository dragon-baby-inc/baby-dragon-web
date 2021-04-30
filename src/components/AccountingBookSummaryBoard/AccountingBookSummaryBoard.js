import React, { useState } from "react"
import styles from './AccountingBookSummaryBoard.module.scss'
import { themeColors } from '../../constants/globalColors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/fontawesome-free-solid'
import { faFilter } from '@fortawesome/fontawesome-free-solid'
import { faEdit } from '@fortawesome/fontawesome-free-solid'

const AccountingBookSummaryBoard = (props) => {
  return(
    <div className={styles.bg}>
      <div className={styles.h1}>
        <h1>{props.name}</h1>
      </div>
    </div>
  )
}

export default AccountingBookSummaryBoard
