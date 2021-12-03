import React, { useState } from 'react';
import { themeColors } from '../../constants'
import {
  PageHeader,
  ColumnSwappableView,
  Separater,
  Image
} from '../../components'
import {
  useTextInput,
  useDatePickerInput,
  useUserRadioSelect,
  useUserRadioSelectLabel,
  useUsers,
} from '../../hooks'

const PaymentCreationPage = () => {
  const [users, userLoading] = useUsers()
  const [index, setIndex] = useState(0);
  const [payer, payerLabel] = useUserRadioSelectLabel({
    users: users,
    initialValue: users[0]
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

  const steps = [
    {
      name: '平分',
      component: <div>
        { nameInput }
        { amountInput }
        { datePickerInput }
        { payerLabel }
      </div>

    },
    {
      name: '自己分',
      component: <div>
        { nameInput }
        { datePickerInput }
        { payerLabel }
      </div>
    }
  ]

  const styles = {
    slide: {
      margin: '20px',
      overflow: 'hidden',
      height: 'calc(100%  - 58px - 49px)',
      backgroundColor: '#FFFFFF',
    }
  }
  return(
    <>
      <PageHeader color={themeColors.gray400}>
        新增帳款
      </PageHeader>
      <Separater style={{ margin: 0 }}/>
      <ColumnSwappableView
        key="PaymentCreationPage__ColumnSwappableView"
        styles={styles}
        index={index}
        setIndex={handleIndexChanged}
        steps={steps}
        height={"100%"}/>
    </>
  )
}

export default PaymentCreationPage;
