import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PaymentCreationPage from './pages/PaymentCreationPage'
import { Provider as PaymentProvider } from './contexts/PaymentContext'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
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
