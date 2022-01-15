import React, { useState, useContext, useEffect } from "react"
import { Context as AuthContext } from '../contexts/AuthContext'
import { themeColors, imageUrls } from '../constants'
import { Context as AccountingBookContext} from '../contexts/AccountingBookContext.js'
import {
  TopRightIcon,
  IconSwappableView,
  PageHeader,
  FontAwesomeIcon,
  Svg,
  Separater,
  SeparaterLabel,
  TextInput,
  Loading,
} from '../components'
import { useHistory, useAccountingBook } from '../hooks'
import { useParams } from 'react-router-dom';

const AccountingBookEditPage = (props) => {
  const { state: authState } = useContext(AuthContext)
  /* eslint-disable no-unused-vars */
  const [users, accountingBookDetails, loading] = useAccountingBook(authState)
  const [pageLoading, setPageLoading] = useState(true)
  const history = useHistory();
  const { group_id, accounting_book_id } = useParams()

  const { state, setImageId, setName, setAutoDetectPayment, setLineNotification } = useContext(AccountingBookContext)

  useEffect(() => {
    if (accountingBookDetails) {
      setName({ name: accountingBookDetails.name, valid: true })
      setImageId(accountingBookDetails.image_id)
      setPageLoading(false)
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [accountingBookDetails])

  const updateAccountingBookName = () => {
    if (!state.name.valid) {
      return
    }

    let params = {
      name: state.name.value,
      image_id: state.imageId.value
    }

    authState.api.updateAccountingBook(accountingBookDetails.group_id, accountingBookDetails.id, { accounting_book: params })
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
        {
          state.imageId ?
            <>
              <div style={styles.swapView}>
                <IconSwappableView
                  changed={setImageId}
                  initial={state.imageId.value}
                  icons={imageUrls}/>
              </div>
              <div style={{margin: '0px 20px'}}>
                <TextInput
                  key='name'
                  disabled={false}
                  svg={<Svg icon='AccountingBook' size='24' className='accountingGold'/> }
                  placeholder={'輸入名稱'}
                  name={'名稱'}
                  labelStyle={styles.labelStyle}
                  changed={(value) => handlInputChange(value)}
                  value={state.name.value === undefined ? '' : state.name.value}
                  valid={state.name.valid}
                  invalidFeedback="不可為空，12字內"
                  type='text'
                />
              </div>
            </>:
            <Loading />
        }
      </div>
    </>
  )
}

const styles = {
  bg: {
    width: '100%',
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
