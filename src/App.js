import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PaymentCreationPage from './pages/PaymentCreationPage'
import { Provider as PaymentProvider } from './contexts/PaymentContext'
import { Context as AuthContext } from './contexts/AuthContext'
import useLiff from './hooks/useLiff'

const App = () => {
  const { setLogin } = useContext(AuthContext)
  const [isLoggedIn] = useLiff(setLogin)

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/liff_entry/groups/:group_id/payments/new">
            <PaymentProvider>
              <PaymentCreationPage />
            </PaymentProvider>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
