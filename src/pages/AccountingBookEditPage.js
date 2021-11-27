import React, { useState, useContext, useEffect } from "react"
import { themeColors } from '../constants'
import { Context as AccountingBookContext} from '../contexts/AccountingBookContext.js'
import {
  TopRightIcon,
  IconSwappableView,
  PageHeader,
  FontAwesomeIcon,
  Separater,
  SeparaterLabel,
  TextInput,
} from '../components'
import { useHistory, useAccountingBook } from '../hooks'
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';
import { dragonBabyApi } from '../api/dragonBabyApi'

const AccountingBookEditPage = (props) => {
  /* eslint-disable no-unused-vars */
  const [users, accountingBookDetails, loading] = useAccountingBook()
  const history = useHistory();
  const { group_id, accounting_book_id } = useParams()

  const { state, setCurrent, setName, setAutoDetectPayment, setLineNotification } = useContext(AccountingBookContext)

  useEffect(() => {
    if (accountingBookDetails) {
      setName({ name: accountingBookDetails.name, valid: true })
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [accountingBookDetails])

  const updateAccountingBookName = () => {
    if (!state.name.valid) {
      return
    }

    dragonBabyApi.updateAccountingBook(accountingBookDetails.group_id, accountingBookDetails.id, { accounting_book: { name: state.name.value } })
      .then((res) => {
        history.navigateTo("accountingBookSettingsPage", { group_id, accounting_book_id })
      })
  }

  const [timer, setTimer] = useState(null)
  const handlInputChange = (value) => {
    console.log(value)
    setName({ name: value, valid: value.length > 0 })
  }
//   const handlInputChange = (value, params, setState) => {
//     setState(value)

//     if (value && value.length > 0) {
//       clearTimeout(timer)

//       let updateTimer = setTimeout(() => {
//         updateAccountingBook(params)
//           .then((res) => {
//             console.log(res)
//           })
//       }, 2000)
//       setTimer(updateTimer)
//     }
//   }

  return(
    <>
      <div style={styles.bg}>
        <TopRightIcon
          clicked={updateAccountingBookName}
          style={{ fontSize: '20px', right: '20px', color: 'black' }} >
          <div> 更新 </div>
        </TopRightIcon>

        <PageHeader
          faicon='faChevronLeft'
          link={`/liff_entry/groups/${group_id}/accounting_books/${accounting_book_id}/settings`}
          color="black">
          編輯帳本名稱
        </PageHeader>
        <Separater style={{ margin: "0px" }}/>
        <div style={styles.swapView}>
          <IconSwappableView icons={[0, 1, 2, 3, 4, 5]}></IconSwappableView>
        </div>
        <div>
          <TextInput
            key='name'
            disabled={false}
            placeholder={'輸入名稱'}
            name={'名稱'}
            labelStyle={styles.labelStyle}
            changed={(value) => handlInputChange(value)}
            value={state.name.value === undefined ? '' : state.name.value}
            valid={state.name.valid}
            invalidFeedback="*不可為空白，12字內"
            type='text'
          />
        </div>
      </div>
    </>
  )
}

const styles = {
  bg: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    maxHeight: '-webkit-fill-available',
    position: 'relative',
  },
  labelStyle: {
    padding: '20px'
  },
  swapView: {
    padding: '40px 0px'
  }
}

export default AccountingBookEditPage
