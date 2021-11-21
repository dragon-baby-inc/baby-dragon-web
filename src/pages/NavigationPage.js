import React from "react"
import { Switch, Route } from 'react-router-dom';
import { IconsList } from '../components'
import useAccountingBook from '../hooks/useAccountingBook'
import BookHistoryPage from './BookHistoryPage'
import PaymentsPage from './PaymentsPage'
import AccountingBookSettingPage from './AccountingBookSettingPage'
import GroupUsersPage from './GroupUsersPage'
import AccountingBookDefaultUsersPage from './AccountingBookDefaultUsersPage'
import PaymentEditPage from './PaymentEditPage'
import AccountingBookSummaryPage from './AccountingBookSummaryPage'

const NavigationPage = (props) => {
  const [users, accountingBookDetails] = useAccountingBook()
  return(
    <>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/payments/:payment_id/edit">
        <PaymentEditPage />
      </Route>
      <Route path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/payments" render={() => {
        return <PaymentsPage />
      }}>
      </Route>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/settings">
        <AccountingBookSettingPage />
      </Route>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/default_users">
        <AccountingBookDefaultUsersPage />
      </Route>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/users">
        <GroupUsersPage />
        <IconsList {...accountingBookDetails}/>
      </Route>
      <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/log_messages">
        <BookHistoryPage users={users} accountingBookDetails={accountingBookDetails}/>
      </Route>
    </>
  )
}

export default NavigationPage
