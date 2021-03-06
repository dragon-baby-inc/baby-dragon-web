import React, { useState, useContext, useEffect } from "react"
import liff from '@line/liff';
import { Context as AuthContext } from '../contexts/AuthContext'
import { themeColors } from '../constants'
import { Context as AccountingBookContext} from '../contexts/AccountingBookContext.js'
import {
  Svg,
  ToggleLabel,
  NavigationLabel,
  ActionLabel,
  AccountingBookSettingsHeader,
  AccountingBookInfo,
  Separater,
  SeparaterLabel,
  FullPageLoader,
  Loading,
  ConfirmBox
} from '../components'
import { useHistory, useAccountingBook } from '../hooks'
import { useParams } from 'react-router-dom';

const AccountingBookSettingPage = (props) => {
  /* eslint-disable no-unused-vars */
  const { state: authState } = useContext(AuthContext)
  const [users, accountingBookDetails, loading] = useAccountingBook(authState)
  const [pageLoading, setPageLoading] = useState(true)
  const [disableForm, setDisableForm] = useState(false)
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
    return authState.api.updateAccountingBook(accountingBookDetails.group_id, accountingBookDetails.id, { accounting_book: params })
  }

  const handleAccountingBookDeletion = (e) => {
    authState.api.deleteAccountingBook(group_id, accounting_book_id)
      .then((res) => {
        history.navigate(`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books`)
        seDeleteActive(false)
      })
      .catch(err => {
        if (err.response.data) {
          alert(err.response.data.error_message)
          seDeleteActive(false)
        }
      })
  }

  const [deleteActive, seDeleteActive] = useState(false)
  let deleteConfirmBox = <ConfirmBox
    title="刪除帳本"
    confirmed={handleAccountingBookDeletion}
    canceled={() => { seDeleteActive(false) }}
    confirm_text="確認"
    cancel_text="取消">
    <div style={{ paddingBottom: '4px' }}> 確認刪除此本帳本嗎?</div>
    <div style={{ paddingBottom: '20px' }}> 此動作無法回復喔！</div>
    </ConfirmBox>

  const handleCurrentChange = (value, params, setState) => {
    setState(value)

    authState.api.updateAccountingBook(group_id, accounting_book_id, { accounting_book: params })
      .then((res) => {
        setLineNotification(res.data.accounting_book.send_liff_confirm_message)
        setAutoDetectPayment(res.data.accounting_book.use_payment_auto_detection)
      })
      .catch((err) => {
        console.log(err)
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
          })
      }, 2000)
      setTimer(updateTimer)
    }
  }

  const downloadURI = (uri, name) => {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  const handlePaymentExport = () => {
    setPageLoading(true)

    if (liff.isInClient()) {
      authState.api.exportPayments(group_id, accounting_book_id)
        .then((res) => {
          let messages =  [{ type: 'text', text: `為了避免龍寶寶因為雲端空間餓死，檔案在30分鐘內會被刪除喔！\nAndriod 手機可能會有亂碼，建議使用電腦下載：${res.data.url}` }]
          liff.sendMessages(messages)
            .then(() => {
              liff.closeWindow()
            })
          setPageLoading(false)
        })
        .catch(err => {
          alert(err.response.data.error_message)
          setPageLoading(false)
        })
    } else {
      authState.api.exportPayments(group_id, accounting_book_id)
        .then((res) => {
          console.log(res.data.url)
          downloadURI(res.data.url)
          setPageLoading(false)
        })
        .catch(err => {
          alert(err.response.data.error_message)
          setPageLoading(false)
        })
    }
  }

  const handleSupport = () => {
    if (liff.isInClient()) {
      let messages =  [{ type: 'text', text: '贊助龍寶寶' }]
      liff.sendMessages(messages)
        .then(() => {
          liff.closeWindow()
        })
    }
  }

  const handleCommunity = () => {
    window.location.assign("https://reurl.cc/qmZLaq");
  }

  if (pageLoading) {
    return <>
      <AccountingBookSettingsHeader/>
      <Separater style={{ margin: "0px" }}/>
      <FullPageLoader />
    </>
  }

  return(
    <>
      <div style={styles.bg}>
        <AccountingBookSettingsHeader/>
        <Separater style={{ margin: "0px" }}/>
        <div style={{ overflow: 'auto', height: 'calc(100vh - 58px)' }}>
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
              hideIcon={true}
              description="帳本幣別"
              disabled={true}
              selectedOptionName={accountingBookDetails.currency}
              clicked={() => { history.navigateTo("accountingBookCurrencyPage", { group_id, accounting_book_id }) }}
            />
            <NavigationLabel
              description="分帳成員"
              selectedOptionName={`${accountingBookDetails.cover_cost_users_size ? accountingBookDetails.cover_cost_users_size : '-'} 人`}
              clicked={() => { history.navigate(`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/default_users`) }}
            />
            <ActionLabel
              style={{ color: "#D65C5C" }}
              description="永久刪除帳本"
              clicked={() => seDeleteActive(true)}
            />
            <Separater />
            <SeparaterLabel name="LINEBOT"/>
            <ToggleLabel
              checked={state.autoDetectPayment.value}
              changed={(e) => handleCurrentChange(e.target.checked, { use_payment_auto_detection: e.target.checked }, setAutoDetectPayment)}
              description="自動偵測新增帳款指令"
              name="autoDetectPayment"
            />
            <ToggleLabel
              checked={state.lineNotification.value}
              changed={(e) => handleCurrentChange(e.target.checked, { send_liff_confirm_message: e.target.checked }, setLineNotification)}
              description="傳送確認訊息到群組"
              name="lineNotification"
            />
            <NavigationLabel
              hideIcon={true}
              description="匯出帳款"
              clicked={handlePaymentExport}
            />
            <NavigationLabel
              hideIcon={true}
              description="贊助龍寶寶"
              clicked={handleSupport}
            />
            <NavigationLabel
              hideIcon={true}
              description="加入社群問問題"
              clicked={handleCommunity}
            />
          </div>
        </div>
      </div>
      {
        deleteActive ?
          deleteConfirmBox : null
      }
      {
        disableForm ?
          <FullPageLoader /> : null
      }
    </>
  )
}
//           <ToggleLabel
//             checked={state.lineNotification.value}
//             changed={(e) => handleCurrentChange(e.target.checked, { send_liff_confirm_message: e.target.checked }, setLineNotification)}
//             description="傳送確認訊息到 Line 群組"
//             name="lineNotification"
//           />

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
    width: '100%',
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
