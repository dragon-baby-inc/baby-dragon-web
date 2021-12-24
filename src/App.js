import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavigationPage from './pages/NavigationPage'
import AccountingBooksPage from './pages/AccountingBooksPage'
import { CookiesProvider } from 'react-cookie';
import { Provider as PaymentProvider } from './contexts/PaymentContext'
import { Provider as FilterPaymentProvider } from './contexts/FilterPaymentContext'
import { Provider as AccountingBookProvider } from './contexts/AccountingBookContext'
import { Context as AuthContext } from './contexts/AuthContext'
import { useLiff } from './hooks'

const App = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  const { setLogin } = useContext(AuthContext)
  /* eslint-disable no-unused-vars */
  const [isLoggedIn] = useLiff(setLogin)

  const steps = [
    {
      name: '帳目明細',
      component: <div></div>
    },
    {
      name: '分帳建議',
      component: <div></div>
    }
  ]

  return (
    <>
      <BrowserRouter>
        <Switch>
          <CookiesProvider>
            <PaymentProvider>
              <Route exact path="/liff_entry">
              </Route>
              <Route exact path="/liff_entry/groups/:group_id/accounting_books">
                <AccountingBooksPage/>
              </Route>
              <AccountingBookProvider>
                <FilterPaymentProvider>
                  <Route path="/liff_entry/groups/:group_id/accounting_books/:accounting_book_id">
                    <NavigationPage />
                  </Route>
                </FilterPaymentProvider>
              </AccountingBookProvider>
            </PaymentProvider>
          </CookiesProvider>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
