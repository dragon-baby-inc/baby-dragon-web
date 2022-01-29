import React, { useState, useEffect, useContext } from 'react';
import liff from '@line/liff';
import styles from './PaymentForm.module.scss'
import { split_into } from '../../../utilities/Calculator';
import { themeColors } from '../../../constants'
import { useParams } from 'react-router-dom';
import { Context as PaymentContext } from '../../../contexts/PaymentContext'
import { evaluate } from 'mathjs'
import {
  FullPageLoader,
  Section,
  DatePickerInput,
  Svg,
  FontAwesomeIcon,
  Button,
  TextInput,
  ColumnSwappableView,
  OwerCheckboxSelectLabel,
  OwerEditableCheckboxSelectLabel,
  UserRadioSelectAmountLabel,
} from '../../../components'
import {
  useHistory,
  useUserRadioSelectLabel,
  useUsersSelect,
} from '../../../hooks'

const PaymentForm = ({ users, manualOwers, index, owers, payment, authState }) => {
  const [disableForm, setDisableForm] = useState(true)
  const [fixedAmount, setFixedAmount] = useState(null)
  const { group_id, accounting_book_id } = useParams()
  const history = useHistory();
  const {
    state,
    validateForm,
    createPayment,
    resetForm
  } = useContext(PaymentContext)

  /* eslint-disable no-unused-vars */
  const [_allocationType, _setAllocationType] = useState('evenly')
  const [_name, _setName] = useState({ value: '', valid: true })
  const [_amount, _setAmount] = useState({ value: '', valid: true })
  const [_creation_date, _setCreationDate] = useState({ value: null, valid: true })
  const [_owers, _setOwers] = useState({ value: [], valid: true })
  const [_manualOwers, _setManualOwers] = useState({ value: [], valid: true })
  const [summaryAmount, setSummaryAmount] = useState(null)
  /* eslint-disable no-unused-vars */
  const [_payer, _setPayer] = useState({ value: null, valid: true })
  const [alertMessage, setAlertMessage] = useState(null)
  const [_users, setUsers] = useState([])

  useEffect(() => {
    if (users.length != _users.length) {
      setUsers(users)
      setDisableForm(false)
    }
  }, [users])

  useEffect(() => {
    if (payment) {
      _setName({ value: payment.description, valid: true })
      _setAmount({ value: payment.amount, valid: true })
      setFixedAmount(payment.amount)
      setSummaryAmount(payment.amount)
      _setCreationDate({ value: payment.paid_at, valid: true })
      _setAllocationType(payment.allocation_type)
    }
  }, [payment, _setName, _setAmount, _setCreationDate, _setAllocationType])

  const [payer, payerLabel] = useUserRadioSelectLabel({
    users: users ? users.filter(u => u.coverCost === true) : [],
    initialValue: state.payer.value,
  })

  const nameInput = <TextInput
    style={{ paddingTop: '16px' }}
    key='name'
    svg={<Svg icon='Payment' size='24' className='gold900'/> }
    disabled={false}
    placeholder='輸入款項'
    name={'款項'}
    changed={(v) => _setName({ value: v, valid: v.length > 0 })}
    value={_name.value}
    valid={_name.valid}
    invalidFeedback="內容不可為空，12字內"
    type='text'
  />

  const datePickerInput = <DatePickerInput
    name='日期'
    changed={(v) => _setCreationDate({ value: v, valid: true })}
    value={_creation_date.value}
    svg={<Svg icon='Date' size='24' className='gold900'/> }
    />

  const handleAmountChanged = (v) => {
    _setAmount({ value: v, valid: true })

    if (v.length === 0) {
      setFixedAmount(null)
    } else {
      setFixedAmount(v)
    }

    let touched = false

    _manualOwers.value.forEach(o => {
      if (o.touched) {
        touched = true
      }
    })

    if (!touched) {
      _setManualOwers(getManualOwersAmount(users, _owers.value, _manualOwers.value.filter(o => !o.user.touched).map(o => o.user.id), v).state)
      setSummaryAmount(v)
    } else {
      let validManualOwersIds = _manualOwers.value.filter(o => o.amount > 0).map(o => o.user.id)
      _setOwers({ value: users.filter(u => validManualOwersIds.includes(u.id)), valid: true })
    }
  }

  const handleOwersChanged = (objs) => {
    let currentOwers = _owers.value
    _setOwers({ value: objs, valid: true, touched: true })

    if (objs.length === 0 && !fixedAmount) {
      _setAmount({ value: 0, valid: true })
    }
  }

  const getManualOwersAmount = (users, owers, unTouchedIds, totalAmount) => {
    let selectedOwerIds = owers.map(o => o.id)

    let amount_array = split_into(totalAmount, selectedOwerIds.length, state.accounting_book_details.exponent)

    let i = 0
    let m_owers = users.map(u => {
      let amount;

      if (!totalAmount || totalAmount === 0) {
        amount = ''
      } else if (selectedOwerIds.includes(u.id)) {
        amount = amount_array[i]
        i++
      } else {
        amount = ''
      }

      return {
        user: u,
        amount: amount
      }
    })

    return({
      state: {
        value: m_owers,
        valid: true
      },
      splits: amount_array
    }
    )
  }

  const handleSetOwerAmount = (object_id, value) => {
    let newOwers = [..._manualOwers.value]
    let index = newOwers.findIndex(o => o.user.id === object_id)
    newOwers[index] = { user: newOwers[index].user, amount: value, touched: true }

    if (!fixedAmount) {
      let sum = newOwers.reduce(function (previousValue, ower) {
        try {
          evaluate(ower.amount)
          if (ower.amount) {
            return previousValue + parseFloat(ower.amount)
          } else {
            return previousValue
          }
        } catch {
          return previousValue
        }
      }, 0)

      _setAmount({ value: sum, valid: sum > 0 })
    }
  }

  let summaryValid = false

  if (fixedAmount > 0) {
    summaryValid = parseFloat(fixedAmount) === parseFloat(summaryAmount)
  } else {
    summaryValid = true
  }

  console.log(_amount)
  const amountInput = <TextInput
    key='amount'
    svg={<Svg icon='Money' size='24' className='gold900'/> }
    disabled={false}
    placeholder='輸入金額'
    name='金額'
    style={{ borderRadius: '16px' }}
    changed={handleAmountChanged}
    value={_amount.value}
    valid={_amount.valid}
    invalidFeedback="內容不可為空，小於100000000"
    type='number'
  />

  const owersLabel = <OwerEditableCheckboxSelectLabel
    exponent={state.accounting_book_details ? state.accounting_book_details.exponent : 0}
    setSummaryAmount={setSummaryAmount}
    getManualOwersAmount={getManualOwersAmount}
    setOwerAmount={handleSetOwerAmount}
    fixedAmount={fixedAmount}
    users={_users ? _users.filter(u => u.coverCost === true) : []}
    manualOwers={_manualOwers}
    selectChanged={handleOwersChanged}
    setManualOwers={_setManualOwers}
    valid={summaryValid}
    selectedObjects={_owers.value}
  />

  const handleManualOwersChanged = (index, data) => {
    let newOwers = [..._manualOwers.value]
    newOwers[index] = data

    let objects = newOwers.filter(object => object.amount > 0)
    let amount = objects.reduce((prev, object) => {
      if (parseFloat(object.amount) > 0) { return prev + parseFloat(object.amount) }
      else { return (prev + 0) }
    }, 0)

    let valid = newOwers.filter(ower => ower.amount > 0).length === newOwers.length

    _setManualOwers({ value: newOwers, valid: valid })
  }

  const buildSelectUsers = (users) => {
    return users.filter((u) => u.coverCost).map((u) => u.id)
  }

  useEffect(() => {
    if (_owers.value.length === 0) {
      _setOwers({ value: owers, valid: true })
      _setManualOwers({ value: manualOwers, valid: true })
    }
  }, [owers])

  const form = {
    evenly: ['name', 'amount', 'payer', 'owers', 'creation_date'],
    amount: ['name', 'payer', 'amount', 'manualOwers', 'creation_date'],
  }

  const buildPaymentSuccessMessage = (message, log_message_category, accounting_book_name) => {
    let contents = {
      "type": "bubble",
      "size": "mega",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "baseline",
            "contents": [
              {
                "type": "text",
                "text": `${log_message_category} 至`,
                "color": "#A58341",
                "align": "start",
                "size": "xs",
                "gravity": "center",
                "weight": "bold",
                "style": "normal",
                "position": "relative",
                "decoration": "none",
                "wrap": true,
                "flex": 0
              },
              {
                "type": "text",
                "text": accounting_book_name,
                "align": "start",
                "size": "xs",
                "gravity": "center",
                "weight": "bold",
                "style": "normal",
                "position": "relative",
                "decoration": "none",
                "wrap": true,
                "flex": 0,
                "margin": "md"
              }
            ]
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": message,
                "size": "sm",
                "wrap": true
              }
            ],
            "paddingTop": "xs"
          }
        ],
        "backgroundColor": "#ffffff",
        "paddingAll": "xl"
      },
      "styles": {
        "header": {
          "separator": true
        },
        "footer": {
          "separator": true
        }
      }
    }

    let flex_message = {
      "type": "flex",
      "altText": '新增款項',
      "contents": contents
    }

    return flex_message
  }

  const handleSubmit = () => {
    let newState = {
      ...state,
      manualOwers: _manualOwers,
      owers: _owers,
      payer: { value: payer, valid: true },
      name: _name,
      creation_date: _creation_date,
      amount: _amount,
      allocation_type: 'amount'
    }

    let valid = validateForm(newState, form['amount'], validate)
    if (!valid) {
      console.log(newState)
      console.log('[Debug] payment invalid')
      return
    }

    setDisableForm(true)

    createPayment(authState.api, newState, (data) => {
      if (data.send_liff_confirm_message === true) {
        if (liff.isInClient()) {
          let message = buildPaymentSuccessMessage(data.log_message_content, data.log_message_category, data.accounting_book_name)
          let messages = [message]
          liff.sendMessages(messages)
            .then(() => {})
        }
      }
      resetForm()
      history.navigateTo("paymentIndexPage", { group_id, accounting_book_id })
    })
  }

  const setFunction = {
    'name': _setName,
    'manualOwers': _setManualOwers,
    'amount': _setAmount,
    'owers': _setOwers
  }

  const validate = (newState) => {
    if (!newState) { return }

    ['name', 'amount'].forEach(el => {
      if (newState[el] && !newState[el].valid) {
        setFunction[el]({ value: newState[el].value, valid: false })
      }
    })
  }

  let disabled = true
  if (!summaryValid) {
    disabled = true
  } else {
    disabled = disableForm
  }

  return(
    <>
      <div className={styles.container}>
        <div className={styles.stepContainer}>
          { nameInput }
          { alertMessage }
          { amountInput }
          { datePickerInput }
          <Section name="付款者"/>
          { payerLabel }
          <Section name="分款者" style={{ marginTop: '16px' }}>
            {
              state.accounting_book_details && summaryAmount > 0 ?
                `小計： ${state.accounting_book_details.currency_symbol}${summaryAmount}` : ""
            }
          </Section>
          { owersLabel }
        </div>


        <div className={styles.footer}>
          <Button clicked={handleSubmit} disabled={disabled}>建立帳款</Button>
          <div style={{
            color: themeColors.invalid,
            fontSize: '12px',
            textAlign: 'center',
            paddingTop: '6px',
            opacity: summaryValid ? '0%' : '100%'
          }}>
            總額與分帳小計不符，請調整
          </div>
        </div>
      </div>
      {
        disableForm ? <FullPageLoader /> : null
      }
    </>
  )
}

  const defaultStyles = {
    root: {
      flexGrow: 1,
      maxHeight: '-webkit-fill-available',
      margin: 0,
      height: 'calc(100% - 49px - 84px)',
      overflow: 'hidden',
    },
    slideContainer: {
      height: 'calc(100%)',
      margin: 0,
      overflow: 'hidden',
    },
    slide: {
      overflow: 'auto',
      height: 'calc(100%)',
      backgroundColor: '#FFFFFF',
    },
  };
export default PaymentForm
