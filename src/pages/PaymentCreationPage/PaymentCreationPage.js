import React, { useState } from 'react';
import { themeColors } from '../../constants'
import {
  PageHeader,
  ColumnSwappableView,
  UserRadioSelectAmountLabel,
  Separater,
  Image,
  Section,
  Button,
  Footer
} from '../../components'
import {
  useTextInput,
  useDatePickerInput,
  useUserRadioSelect,
  useUserRadioSelectLabel,
  useUserCheckboxSelectLabel,
  useUserRadioSelectAmountLabel,
  useUsers,
} from '../../hooks'

const PaymentCreationPage = () => {
  const [users, userLoading] = useUsers()
  const [index, setIndex] = useState(1);
  const [customOwers, customOwersSelect] = useUserRadioSelectAmountLabel({
    users: users,
    owers: [{ user: users[0], amount: null }]
  })
  const [payer, payerLabel] = useUserRadioSelectLabel({
    users: users,
    initialValue: users[0]
  })
  const [owers, owersLabel] = useUserCheckboxSelectLabel({
    users: users,
    initialValue: users,
  })

  const [name, nameInput] = useTextInput({
    name: '款項',
    placeholder: '輸入名稱',
    faicon: "farCreditCard",
    type: 'text',
    invalidFeedback: "不可為空",
    valid: true,
  })

  const [datePicker, datePickerInput] = useDatePickerInput({
    name: '日期',
    placeholder: '輸入名稱',
    faicon: "farCreditCard",
    type: 'text',
    invalidFeedback: "不可為空",
    valid: true,
  })

  const [amount, amountInput] = useTextInput({
    name: '金額',
    placeholder: '輸入金額',
    faicon: "farCreditCard",
    type: 'number',
    invalidFeedback: "不可為空",
    valid: true,
  })

  const handleIndexChanged = (i) => {
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

  const styles = {
    slide: {
      height: '100%',
      backgroundColor: '#FFFFFF',
    },
    containter: {
      display: 'flex',
      flexFlow: 'column nowrap',
      height: '100vh',
      overflow: 'hidden',
    }
  }

  return(
    <div style={styles.containter}>
      <PageHeader color={themeColors.gray400}>
        新增帳款
      </PageHeader>
      <Separater style={{ margin: 0 }}/>
      <ColumnSwappableView
        key="PaymentCreationPage__ColumnSwappableView"
        styles={styles}
        index={index}
        height={'100%'}
        setIndex={handleIndexChanged}
        steps={steps} />
      <Footer>
        <Button>建立帳款</Button>
      </Footer>
    </div>
  )
}

export default PaymentCreationPage;
