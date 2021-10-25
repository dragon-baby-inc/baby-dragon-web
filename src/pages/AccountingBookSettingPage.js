import React, { useState, useContext, useEffect, useRef } from "react"
import { Context } from '../contexts/PaymentContext'
import { Context as AuthContext } from '../contexts/AuthContext'
import useAccountingBook from '../hooks/useAccountingBook'
import useAccountingBookSummary from '../hooks/useAccountingBookSummary'
import FloatIcon from '../components/FormElements/FloatIcon/FloatIcon'
import { themeColors } from '../constants/globalColors'
import TopLeftIcon from '../components/IconLinks/TopLeftIcon'
import useScrollInfo from 'react-element-scroll-hook';
import AccountingBookSettingsHeader from '../components/AccountingBookSettingsHeader/AccountingBookSettingsHeader'
import Loading from '../components/Loading/Loading'
import EmptyResult from '../components/EmptyResult/EmptyResult'
import Backdrop from '../components/Backdrop/Backdrop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MyFontAwesomeIcon from '../utilities/FontAwesomeIcon'
import { faPlus } from '@fortawesome/fontawesome-free-solid'
import useHistory from '../hooks/useHistory'
import { useParams } from 'react-router-dom';
import useToggle from '../hooks/useToggle'
import useInput from '../hooks/useInput'
import Toggle from '../components/FormElements/Toggle/Toggle'
import { Context as AccountingBookContext} from '../contexts/AccountingBookContext.js'
import axios from '../api/dragonBabyApi'
import Button from '../components/FormElements/Button/Button'

const AccountingBookSettingPage = (props) => {
  const [ editMode, setEditMode ] = useState(false)
  const [users, accountingBookDetails, loading] = useAccountingBook()
  const [summary] = useAccountingBookSummary()
  const history = useHistory();
  const { group_id, accounting_book_id } = useParams();
  const [lockDeletion, setLockDeletion] = useState(true)

  const { state, setCurrent, setName, setAutoDetectPayment, setLineNotification } = useContext(AccountingBookContext)

  useEffect(() => {
    setName(accountingBookDetails.name)
    setAutoDetectPayment(accountingBookDetails.use_payment_auto_detection)
    setLineNotification(accountingBookDetails.send_liff_confirm_message)
    setCurrent(accountingBookDetails.current)
  }, [accountingBookDetails])

  const updateAccountingBook = (params) => {
    return axios.patch(`api/v1/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}`, { accounting_book: params })
  }

  const handleAccountingBookDeletion = (e) => {
    if (lockDeletion) { return }

    e.preventDefault()
    let confirm = window.confirm("確定要刪除帳本嗎？此動作無法回覆喔");

    if (confirm == true) {
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
        .then((res) => {
          console.log(res)
        })
    }
  }

  const handleCurrentChange = (value, params, setState) => {
    console.log(updateAccountingBook)
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
        <TopLeftIcon link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books`} color='black' faIcon='faHome'/>
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
                    type="text" value={state.name.value}
                    onChange={(e) => handlInputChange(e.target.value, { name: e.target.value }, setName)}
                  />
              }
            </label>
            <label style={styles.label}>
              <span style={styles.description}>
                Line 預設帳本
              </span>
              {
                loading ?
                  null :
                  <Toggle
                    disabled={state.current.value == true}
                    defaultChecked={state.current.value}
                    checked={state.current.value}
                    changed={(e) => handleSetAsCurrent(e.target.checked)}
                    name="current"
                  />
              }
            </label>
            <label style={styles.label}>
              <span style={styles.description}>
                自動偵測群組帳款指令
              </span>
              {
                loading ?
                  null :
                  <Toggle
                    defaultChecked={state.autoDetectPayment.value}
                    checked={state.autoDetectPayment.value}
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
                    defaultChecked={state.lineNotification.value}
                    checked={state.lineNotification.value}
                    changed={(e) => handleCurrentChange(e.target.checked, { send_liff_confirm_message: e.target.checked }, setLineNotification)}
                    name="lineNotification"
                  />
              }
            </label>
          </div>
          <div>
            <label style={styles.label} onClick={() => { history.navigate(`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/users`) }}>
              <span style={styles.description}>
                預設分帳名單
              </span>
              <MyFontAwesomeIcon style={{ fontSize: "10px", margin: "0px 15px" }} faIcon='faChevronRight' color={themeColors.gray900}/>
            </label>
          </div>
          <div style={styles.label}>
            <div disabled={lockDeletion} onClick={handleAccountingBookDeletion} style={lockDeletion ? styles.alertLabelDisable : styles.alertLabel}>
              永久刪除此本帳本
            </div>
            <Toggle
              defaultChecked={!lockDeletion}
              checked={!lockDeletion}
              changed={(e) => setLockDeletion(!e.target.checked)}
              icons={ {
                checked: <MyFontAwesomeIcon style={{ fontSize: "10px", marginRight: "10px" }} faIcon='faLockOpen' color="white"/> ,
                unchecked: <MyFontAwesomeIcon style={{ fontSize: "10px", marginRight: "10px" }} faIcon='faLock' color="white"/> ,
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
