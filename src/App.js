import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PaymentCreationPage from './pages/PaymentCreationPage'
import NavigationPage from './pages/NavigationPage'
import AccountingBooksPage from './pages/AccountingBooksPage'
import { Provider as PaymentProvider } from './contexts/PaymentContext'
import { Provider as FilterPaymentProvider } from './contexts/FilterPaymentContext'
import { Context as AuthContext } from './contexts/AuthContext'
import useLiff from './hooks/useLiff'

const App = () => {
  const { setLogin } = useContext(AuthContext)
  const [isLoggedIn] = useLiff(setLogin)

  return (
    <>
      <BrowserRouter>
        <Switch>
          <PaymentProvider>
            <Route exact path="/liff_entry">
            </Route>
            <Route exact path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id/payments/new">
              <PaymentCreationPage />
            </Route>
            <Route exact path="/liff_entry/groups/:group_id/accounting_books">
              <AccountingBooksPage/>
            </Route>
            <FilterPaymentProvider>
              <Route path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id">
                <NavigationPage />
              </Route>
            </FilterPaymentProvider>
          </PaymentProvider>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
