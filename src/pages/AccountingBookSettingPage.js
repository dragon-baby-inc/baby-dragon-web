import React, { useState, useContext, useEffect } from "react"
import { themeColors } from '../constants'
import { Context as AccountingBookContext} from '../contexts/AccountingBookContext.js'
import {
  FontAwesomeIcon,
  Toggle,
  ToggleLabel,
  NavigationLabel,
  ActionLabel,
  TopLeftIcon,
  AccountingBookSettingsHeader,
  AccountingBookInfo,
  Separater,
  SeparaterLabel,
  Loading
} from '../components'
import { useHistory, useAccountingBook } from '../hooks'
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';
import { dragonBabyApi } from '../api/dragonBabyApi'

const AccountingBookSettingPage = (props) => {
  /* eslint-disable no-unused-vars */
  const [users, accountingBookDetails, loading] = useAccountingBook()
  const [pageLoading, setPageLoading] = useState(true)
  const history = useHistory();
  const { group_id, accounting_book_id } = useParams()

  const { state, setCurrent, setName, setAutoDetectPayment, setLineNotification } = useContext(AccountingBookContext)

  useEffect(() => {
    if (accountingBookDetails) {
      setName(accountingBookDetails.name)
      setAutoDetectPayment(accountingBookDetails.use_payment_auto_detection)
      setLineNotification(accountingBookDetails.send_liff_confirm_message)
      setCurrent(accountingBookDetails.current)
      setPageLoading(false)
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [accountingBookDetails])

  const updateAccountingBook = (params) => {
    return dragonBabyApi.updateAccountingBook(accountingBookDetails.group_id, accountingBookDetails.id, { accounting_book: params })
  }

  const handleAccountingBookDeletion = (e) => {
    e.preventDefault()

    let confirm = window.confirm("確定要刪除帳本嗎？此動作無法回覆喔");

    if (confirm === true) {
      dragonBabyApi.deleteAccountingBook(group_id, accounting_book_id)
        .then((res) => {
          history.navigate(`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books`)
        })
    } else {
      return
    }
  }

  const handleCurrentChange = (value, params, setState) => {
    dragonBabyApi.updateAccountingBook(group_id, accounting_book_id, { accounting_book: params })
      .then((res) => {
        console.log(res)
        setState(value)
      })
      .catch((res) => {
        console.log(res)
      })
  }

  const [timer, setTimer] = useState(null)
  const handlInputChange = (value, params, setState) => {
    setState(value)

    if (value && value.length > 0) {
      clearTimeout(timer)

      let updateTimer = setTimeout(() => {
        updateAccountingBook(params)
          .then((res) => {
            console.log(res)
          })
      }, 2000)
      setTimer(updateTimer)
    }
  }

  if (pageLoading) {
    return <>
      <AccountingBookSettingsHeader/>
      <Separater style={{ margin: "0px" }}/>
      <Loading />
    </>
  }

  return(
    <>
      <div style={styles.bg}>
        <AccountingBookSettingsHeader/>
        <Separater style={{ margin: "0px" }}/>
        <SeparaterLabel style={{ paddingTop: '19px' }} name="帳本設定"/>
        <AccountingBookInfo style={{ paddingTop: "19px", paddingBottom: "19px" }} accountingBookDetails={accountingBookDetails}/>
        <div style={styles.settings}>
          {
            true ?
              null:
              <label style={styles.label}>
                <span style={styles.description}>
                  帳本名稱
                </span>
                {
                  loading ?
                    null :
                    <input
                      style={styles.textInput}
                      type="text"
                      value={state.name.value === undefined ? '' : state.name.value}
                      onChange={(e) => handlInputChange(e.target.value, { name: e.target.value }, setName)}
                    />
                }
              </label>
          }
          <NavigationLabel
            description="編輯幣別"
            clicked={() => { history.navigateTo("accountingBookCurrencyPage", { group_id, accounting_book_id }) }}
          />
          <NavigationLabel
            description="分帳成員"
            selectedOptionName={`${accountingBookDetails.cover_cost_users_size}人`}
            clicked={() => { history.navigate(`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/default_users`) }}
          />
          <ActionLabel
            style={{ color: "#D65C5C" }}
            description="永久刪除帳本"
            clicked={handleAccountingBookDeletion}
          />
          <Separater />
          <SeparaterLabel name="LINEBOT"/>
          <ToggleLabel
            checked={state.autoDetectPayment.value}
            changed={(e) => handleCurrentChange(e.target.checked, { use_payment_auto_detection: e.target.checked }, setAutoDetectPayment)}
            description="Line 自動偵測帳款指令"
            name="autoDetectPayment"
          />
          <ToggleLabel
            checked={state.lineNotification.value}
            changed={(e) => handleCurrentChange(e.target.checked, { send_liff_confirm_message: e.target.checked }, setLineNotification)}
            description="傳送確認訊息到 Line 群組"
            name="lineNotification"
          />
        </div>
      </div>
    </>
  )
}

const styles = {
  settings: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between'
  },
  alertLabelDisable: {
    cursor: 'not-allowed',
    padding: '6px 0px',
    margin: '0px 0px',
    color: 'gray',
    fontSize: "15px",
    fontWeight: 500,
    flexGrow: 1,
  },
  alertLabel: {
    cursor: 'pointer',
    color: "#F9676A",
    margin: '0px 0px',
    padding: '6px 0px',
    flexGrow: 1,
    fontSize: "15px",
    fontWeight: 500
  },
  textInput: {
    textAlign: "right",
    fontSize: "15px"
  },
  label: {
    minHeight: '55px',
    cursor: 'pointer',
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 30px",
  },
  description: {
    fontSize: "15px"
  },
  bg: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    maxHeight: '-webkit-fill-available',
    position: 'relative',
  },
  h1: {
    padding: '12px',
    textAlign: 'center',
    fontSize: '1.5rem',
  },
  dateSeparator: {
    fontSize: '12px',
    textAlign: 'center',
    padding: '5px',
    color: themeColors.gray600,
  },
}

export default AccountingBookSettingPage
