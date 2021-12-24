import React, {useState} from "react"
import { useParams } from 'react-router-dom';
import styles from './AccountingBookInfo.module.scss';
import { Image, FontAwesomeIcon } from '../../'
import { themeColors } from '../../../constants';
import { useHistory } from '../../../hooks'

function AccountingBookInfo({
  accountingBookDetails,
  style,
}){
  const { navigateTo } = useHistory();
  const { group_id, accounting_book_id } = useParams()

  const handleClick = () => {
    navigateTo("accountingBookEditPage", { group_id, accounting_book_id })
  }

  return(
    <>
      {
        accountingBookDetails ?
        <label style={style ? style : {}} className={styles.container} onClick={handleClick}>
          <Image size='80px' circle imageUrl={accountingBookDetails.imageUrl} defaultImage="accountingBook"/>
          <div className={styles.label}>
            {accountingBookDetails.name}
            <FontAwesomeIcon
              style={{ fontSize: "15px", margin: "0px 0px" }}
              faicon='faChevronRight'
              color={themeColors.gray900}/>
          </div>
        </label>
        :
          null
      }
    </>
  )
}

export default AccountingBookInfo;
