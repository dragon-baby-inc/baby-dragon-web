import React, { useState, useContext, useEffect } from "react"
import IconsList from '../components/FormElements/IconsList/IconsList'
import useAccountingBook from '../hooks/useAccountingBook'
import PaymentsPage from './PaymentsPage'
import PaymentEditPage from './PaymentEditPage'
import AccountingBookSummaryPage from './AccountingBookSummaryPage'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const styles = {
  bg: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
}

const NavigationPage = (props) => {
  const [users, accountingBookDetails] = useAccountingBook()
  return(
    <Switch>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/payments">
        <PaymentsPage />
        <IconsList {...accountingBookDetails}/>
      </Route>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/payments/:payment_id/edit">
        <PaymentEditPage />
      </Route>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/summary">
        <AccountingBookSummaryPage users={users} accountingBookDetails={accountingBookDetails}/>
        <IconsList {...accountingBookDetails}/>
      </Route>
    </Switch>
  )
}

export default NavigationPage
