import React, { useState, useEffect, useContext } from 'react';
import { Context as PaymentContext } from '../../contexts/PaymentContext'
import { Context as AuthContext } from '../../contexts/AuthContext'
import { useParams } from 'react-router-dom';
import styles from './PaymentCreationPage.module.scss'
import { themeColors } from '../../constants'
import {
  DatePickerInput,
  TextInput,
  PageHeader,
  ColumnSwappableView,
  UserRadioSelectAmountLabel,
  Separater,
  Image,
  Section,
  Button,
  UserCheckboxSelectLabel,
  Footer,
  TopRightIcon
} from '../../components'
import {
  useHistory,
  useTextInput,
  useDatePickerInput,
  useAccountingBook,
  useUserRadioSelect,
  useUserRadioSelectLabel,
  useUserCheckboxSelectLabel,
  useUserRadioSelectAmountLabel,
  useUsers,
} from '../../hooks'

const PaymentCreationPage = () => {
  const {
    state,
    setName,
    setAmount,
    setPayer,
    setBuilder,
    setOwers,
    setManualOwers,
    setCreationDate,
    setAllocationType,
    setShowRadioSelect,
    setAccountingBookDetails,
    setShowCheckboxSelect,
    setShowPopUpForm,
    validateForm,
    createPayment,
    resetForm
  } = useContext(PaymentContext)

  const { group_id, accounting_book_id } = useParams()
  const [disableForm, setDisableForm] = useState(true)
  const history = useHistory();
  const [users, accountingBookDetails, loading] = useAccountingBook()
  const { state: authState } = useContext(AuthContext)
  const [index, setIndex] = useState(0);

  useEffect(() => {
    resetForm()
  }, [])

  useEffect(() => {
    if (!loading) {
      let payer = users.filter(u => String(u.id) === authState.userLineIdToken)[0]
      if (payer) { setPayer(payer) }
      // if (!payer) { alert('未授權') }
      setPayer(users[0])
      setAccountingBookDetails(accountingBookDetails)
      setBuilder(users[0])
      setOwers(users.filter((u) => u.coverCost))
      setManualOwers({ owers: [{ user: users[0], amount: null }], valid: true })
      setDisableForm(false)
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [users, authState, accountingBookDetails, loading])

  const [customOwers, customOwersSelect] = useUserRadioSelectAmountLabel({
    users: users,
    owers: state.manualOwers.value,
    callback: (owers) => setManualOwers({ owers }),
    valid: state.manualOwers.valid
  })

  const [payer, payerLabel] = useUserRadioSelectLabel({
    users: users,
    initialValue: state.payer.value,
  })

  const owersLabel = <UserCheckboxSelectLabel
    users={users}
    callback={setOwers}
    selectedObjects={state.owers.value}
  />

  const nameInput = <TextInput
    key='name'
    faicon="farCreditCard"
    disabled={false}
    placeholder='輸入名稱'
    name={'名稱'}
    changed={setName}
    value={state.name.value === undefined ? '' : state.name.value}
    valid={state.name.valid}
    invalidFeedback="*不可為空白，12字內"
    type='text'
  />

  const datePickerInput = <DatePickerInput
    name='日期'
    changed={setCreationDate}
    value={state.creation_date.value}
    faicon="farCreditCard"
    />

  const amountInput = <TextInput
    key='amount'
    faicon="farCreditCard"
    disabled={false}
    placeholder='輸入金額'
    name='金額'
    changed={setAmount}
    value={state.amount.value === undefined ? '' : state.amount.value}
    valid={state.amount.valid}
    invalidFeedback="*不可為空白，12字內"
    type='number'
  />

  const handleIndexChanged = (i) => {
    if (i === 0) {
      setAllocationType('evenly')
    } else {
      setAllocationType('amount')
    }
    setIndex(i)
  }

  let contentHeight = "calc(100%)"
  let contentStyle = {
    maxHeight: contentHeight,
    height: contentHeight,
    padding: '0px 20px',
    paddingTop: '16px',
    overflow: 'auto'
  }
  const steps = [
    {
      name: '平分',
      component: <div
      style={contentStyle}>
        { nameInput }
        { amountInput }
        { datePickerInput }
        <Section name="付款者"/>
        { payerLabel }
        <Section name="分款者" style={{ marginTop: '16px' }}/>
        { owersLabel }
      </div>

    },
    {
      name: '自己分',
      component: <div
      style={contentStyle}>
        { nameInput }
        { datePickerInput }
        <Section name="付款者"/>
        { payerLabel }
        <Section name="欠款者" style={{ marginTop: '16px' }}/>
        { customOwersSelect }
      </div>
    }
  ]

  const customStyles = {
    slide: {
      height: '100%',
      backgroundColor: '#FFFFFF',
    },
  }

  const form = {
    evenly: ['name', 'amount', 'payer', 'owers', 'creation_date'],
    amount: ['name', 'payer','manualOwers', 'creation_date'],
  }

  const handleSubmit = (e) => {
    if (disableForm) { return }
    let valid = validateForm(state, form[state.allocation_type])
    if (!valid) { return }
    createPayment(state, () => {
      history.navigateTo("paymentIndexPage", { group_id, accounting_book_id })
    })
  }

  return(
    <div className={styles.container}>
      <TopRightIcon
        clicked={() => {history.navigateTo("paymentIndexPage", { group_id, accounting_book_id })}}
        style={{ fontSize: '20px', right: '20px', color: 'black' }} >
        <div> 取消 </div>
      </TopRightIcon>
      <PageHeader color={themeColors.gray400}>
        新增帳款
      </PageHeader>
      <Separater style={{ margin: 0 }}/>
      <ColumnSwappableView
        key="PaymentCreationPage__ColumnSwappableView"
        styles={customStyles}
        index={index}
        height={'100%'}
        callback={handleIndexChanged}
        steps={steps} />
      <Footer>
        <Button clicked={handleSubmit}>建立帳款</Button>
      </Footer>
    </div>
  )
}

export default PaymentCreationPage;
