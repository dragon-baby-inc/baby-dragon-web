import React from "react"
import { Route } from 'react-router-dom';
import BookHistoryPage from './BookHistoryPage'
import PaymentsPage from './PaymentsPage'
import AccountingBookSettingPage from './AccountingBookSettingPage'
import AccountingBookEditPage from './AccountingBookEditPage'
import AccountingBookDefaultUsersPage from './AccountingBookDefaultUsersPage'
import {
  PaymentEditPage,
  AccountingBookCurrencyPage,
  AccountingBookCreationPage,
  PaymentPaidBackPage,
  PaymentCreationPage
} from './index'

const NavigationPage = (props) => {
  return(
    <>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/payments/new">
        <PaymentCreationPage />
      </Route>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/payments/paid_back">
        <PaymentPaidBackPage />
      </Route>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/new">
        <AccountingBookCreationPage />
      </Route>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/payments/:payment_id/edit">
        <PaymentEditPage />
      </Route>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/payments/index">
        <PaymentsPage />
      </Route>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/edit/index">
        <AccountingBookEditPage />
      </Route>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/currency">
        <AccountingBookCurrencyPage />
      </Route>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/settings">
        <AccountingBookSettingPage />
      </Route>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/default_users">
        <AccountingBookDefaultUsersPage />
      </Route>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/log_messages">
        <BookHistoryPage/>
      </Route>
    </>
  )
}

export default NavigationPage

