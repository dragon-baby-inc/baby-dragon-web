import React, { useState, useEffect, useContext } from 'react';
import { Context as PaymentContext } from '../../contexts/PaymentContext'
import { Context as AuthContext } from '../../contexts/AuthContext'
import { useParams } from 'react-router-dom';
import styles from './PaymentCreationPage.module.scss'
import { themeColors } from '../../constants'
import {
  useHistory
} from '../../hooks'
import {
  PageHeader,
  TopRightIcon,
  PaymentForm,
  Separater
} from '../../components'

const PaymentCreationPage = () => {
  const { group_id, accounting_book_id } = useParams()
  const [disableForm, setDisableForm] = useState(true)
  const history = useHistory();

  return(
    <>
      <TopRightIcon
        clicked={() => {history.navigateTo("paymentIndexPage", { group_id, accounting_book_id })}}
        style={{ fontSize: '20px', right: '20px', color: 'black' }} >
        <div> 取消 </div>
      </TopRightIcon>
      <PageHeader color={themeColors.gray400}>
        新增帳款
      </PageHeader>
      <Separater style={{ margin: 0 }}/>
      <PaymentForm />
    </>
  )
}

export default PaymentCreationPage;
