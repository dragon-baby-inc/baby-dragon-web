import React, { useState, useEffect, useContext } from 'react';
import { Context as PaymentContext } from '../../contexts/PaymentContext'
import { Context as AuthContext } from '../../contexts/AuthContext'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import styles from '../PaymentCreationPage/PaymentCreationPage.module.scss'
import { themeColors } from '../../constants'
import {
  useHistory,
  useAccountingBook,
} from '../../hooks'
import {
  FullPageLoader,
  PageHeader,
  TopRightIcon,
  PaidBackForm,
  Separater
} from '../../components'

const PaymentPaidBackPage = () => {
  const {
    setAccountingBookDetails,
    setBuilder,
    resetForm,
  } = useContext(PaymentContext)

  const [cookies, setCookie] = useCookies(['name']);
  const payment = cookies.payment
  const { group_id, accounting_book_id } = useParams()
  const [disableForm, setDisableForm] = useState(true)
  const history = useHistory();
  const { state: authState } = useContext(AuthContext)
  const [users, accountingBookDetails, loading] = useAccountingBook(authState)
  const [index, setIndex] = useState(0);
  const [_manualOwers, _setManualOwers] = useState([])
  const [_owers, _setOwers] = useState([])

  useEffect(() => {
    resetForm()
  }, [])

  useEffect(() => {
    if (users && authState.userLineIdToken) {
      let builder = users.filter(u => String(u.id) === authState.userLineIdToken)[0]
      setBuilder(builder)
    }
  }, [authState.userLineIdToken, users])

  useEffect(() => {
    if (!loading) {
      setAccountingBookDetails(accountingBookDetails)
      setDisableForm(false)
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [loading])

  const handleBack = () => {
    resetForm()
    history.navigateTo("paymentIndexPage", { group_id, accounting_book_id })
  }

  return(
    <>
      <TopRightIcon
        clicked={handleBack}
        style={{ fontSize: '20px', right: '20px', color: 'black' }} >
        <div> 取消 </div>
      </TopRightIcon>
      <PageHeader color={themeColors.gray400}>
        新增還款
      </PageHeader>
      <Separater style={{ margin: 0 }}/>
      {
        loading ?
          <FullPageLoader /> :
          <>
            {
              _manualOwers ?
                <PaidBackForm
                  index={index}
                  users={users}
                  manualOwers={_manualOwers}
                  owers={_owers}
                  payment={payment}
                /> : null
            }
          </>
      }
    </>

  )
}

export default PaymentPaidBackPage;
