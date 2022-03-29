import React, { useContext } from "react";
import { Provider as PaymentProvider } from "../contexts/PaymentContext";
import { Provider as AccountingBookProvider } from "../contexts/AccountingBookContext";
import { Context as AuthContext } from "../contexts/AuthContext";
import { Route } from "react-router-dom";
import { useLiff } from "../hooks";
import {
  BookHistoryPage,
  PaymentsPage,
  AccountingBooksPage,
  AccountingBookEditPage,
  AccountingBookSettingPage,
  CurrentRedirect,
  PaymentEditPage,
  AccountingBookDefaultUsersPage,
  AccountingBookCurrencyPage,
  AccountingBookCreationPage,
  PaymentPaidBackPage,
  PaymentCreationPage,
} from "./index";

const NavigationPage = (props) => {
  const { setLogin } = useContext(AuthContext);
  /* eslint-disable no-unused-vars */
  const [isLoggedIn] = useLiff(setLogin);

  return (
    <>
      <PaymentProvider>
        <Route exact path="/liff_entry">
          {" "}
        </Route>
        <Route exact path="/liff_entry/groups/:group_id/accounting_books">
          <AccountingBooksPage />
        </Route>
        <AccountingBookProvider>
          <Route exact path="/liff_entry/groups/:group_id/current_payments">
            <CurrentRedirect page="current_payments" />
          </Route>
          <Route exact path="/liff_entry/groups/:group_id/current_summary">
            <CurrentRedirect page="current_summary" />
          </Route>
          <Route exact path="/liff_entry/groups/:group_id/current_new_payment">
            <CurrentRedirect page="current_new_payment" />
          </Route>
          <Route
            exact
            path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/payments/new"
          >
            <PaymentCreationPage />
          </Route>
          <Route
            exact
            path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/payments/paid_back"
          >
            <PaymentPaidBackPage />
          </Route>
          <Route exact path="/liff_entry/groups/:group_id/accounting_books/new">
            <AccountingBookCreationPage />
          </Route>
          <Route
            exact
            path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/payments/:payment_id/edit"
          >
            <PaymentEditPage />
          </Route>
          <Route
            exact
            path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/payments/summary"
          >
            <PaymentsPage index={1} />
          </Route>
          <Route
            exact
            path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/payments/index"
          >
            <PaymentsPage index={0} />
          </Route>
          <Route
            exact
            path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/edit/index"
          >
            <AccountingBookEditPage />
          </Route>
          <Route
            exact
            path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/currency"
          >
            <AccountingBookCurrencyPage />
          </Route>
          <Route
            exact
            path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/settings"
          >
            <AccountingBookSettingPage />
          </Route>
          <Route
            exact
            path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/default_users"
          >
            <AccountingBookDefaultUsersPage />
          </Route>
          <Route
            exact
            path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/log_messages"
          >
            <BookHistoryPage />
          </Route>
        </AccountingBookProvider>
      </PaymentProvider>
    </>
  );
};

export default NavigationPage;
