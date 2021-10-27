import React, { useState, useContext, useEffect } from "react"
import { themeColors } from '../constants'
import { Context as AccountingBookContext} from '../contexts/AccountingBookContext.js'
import { FontAwesomeIcon, Toggle, TopLeftIcon, AccountingBookSettingsHeader } from '../components'
import { useHistory, useAccountingBook } from '../hooks'
import axios from '../api/dragonBabyApi'

const AccountingBookSettingPage = (props) => {
  /* eslint-disable no-unused-vars */
  const [users, accountingBookDetails, loading] = useAccountingBook()
  const history = useHistory();
  const [lockDeletion, setLockDeletion] = useState(true)

  const { state, setCurrent, setName, setAutoDetectPayment, setLineNotification } = useContext(AccountingBookContext)

  useEffect(() => {
    setName(accountingBookDetails.name)
    setAutoDetectPayment(accountingBookDetails.use_payment_auto_detection)
    setLineNotification(accountingBookDetails.send_liff_confirm_message)
    setCurrent(accountingBookDetails.current)
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [accountingBookDetails])

  const updateAccountingBook = (params) => {
    return axios.patch(`api/v1/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}`, { accounting_book: params })
  }

  const handleAccountingBookDeletion = (e) => {
    if (lockDeletion) { return }

    e.preventDefault()
    let confirm = window.confirm("確定要刪除帳本嗎？此動作無法回覆喔");

    if (confirm === true) {
      axios.delete(`api/v1/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}`)
        .then((res) => {
          history.navigate(`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books`)
        })
    } else {
      setLockDeletion(true)
    }
  }

  const handleSetAsCurrent = (value) => {
    setCurrent(value)
    if (value) {
      axios.post(`api/v1/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/set_as_current`)
        .catch((res) => {
          console.log(res.response)
        })
    }
  }

  const handleCurrentChange = (value, params, setState) => {
    updateAccountingBook(params)
      .then((res) => {
        console.log(res)
        setState(value)
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

  return(
    <>
      <div style={styles.bg}>
        <AccountingBookSettingsHeader></AccountingBookSettingsHeader>
        <TopLeftIcon link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books`} color={themeColors.gold900} faicon='faHome' style={{fontSize: '20px'}}/>
        <div style={styles.settings}>
          <div>
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
            <div>
              <label style={styles.label} onClick={() => { history.navigate(`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/default_users`) }}>
                <span style={styles.description}>
                  設定分帳名單
                </span>
                <FontAwesomeIcon style={{ fontSize: "10px", margin: "0px 15px" }} faicon='faChevronRight' color={themeColors.gray900}/>
              </label>
            </div>
            <div>
              <label style={styles.label} onClick={() => { history.navigate(`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/users`) }}>
                <span style={styles.description}>
                  編輯使用者
                </span>
                <FontAwesomeIcon style={{ fontSize: "10px", margin: "0px 15px" }} faicon='faChevronRight' color={themeColors.gray900}/>
              </label>
            </div>
            <label style={styles.label}>
              <span style={styles.description}>
                Line 預設帳本
              </span>
              {
                loading ?
                  null :
                  <Toggle
                    disabled={state.current.value === true}
                    checked={state.current.value === undefined ? false : state.current.value}
                    changed={(e) => handleSetAsCurrent(e.target.checked)}
                    name="current"
                  />
              }
            </label>
            <label style={styles.label}>
              <span style={styles.description}>
                Line 自動偵測帳款指令
              </span>
              {
                loading ?
                  null :
                  <Toggle
                    checked={state.autoDetectPayment.value === undefined ? false : state.autoDetectPayment.value}
                    changed={(e) => handleCurrentChange(e.target.checked, { use_payment_auto_detection: e.target.checked }, setAutoDetectPayment)}
                    description="自動偵測群組帳款指令"
                    name="autoDetectPayment"
                  />
              }
            </label>
            <label style={styles.label}>
              <span style={styles.description}>
                傳送確認訊息到 Line 群組
              </span>
              {
                loading ?
                  null :
                  <Toggle
                    checked={state.lineNotification.value === undefined ? false : state.lineNotification.value}
                    changed={(e) => handleCurrentChange(e.target.checked, { send_liff_confirm_message: e.target.checked }, setLineNotification)}
                    name="lineNotification"
                  />
              }
            </label>
          </div>
          <div style={styles.label}>
            <div disabled={lockDeletion} onClick={handleAccountingBookDeletion} style={lockDeletion ? styles.alertLabelDisable : styles.alertLabel}>
              永久刪除此本帳本
            </div>
            <Toggle
              checked={!lockDeletion}
              changed={(e) => setLockDeletion(!e.target.checked)}
              icons={ {
                checked: <FontAwesomeIcon style={{ fontSize: "10px", marginRight: "10px" }} faicon='faLockOpen' color="white"/> ,
                unchecked: <FontAwesomeIcon style={{ fontSize: "10px", marginRight: "10px" }} faicon='faLock' color="white"/> ,
              } }
              name="current"
            />
          </div>
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
    borderBottom: "1px solid #eee",
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
