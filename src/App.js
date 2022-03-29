import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavigationPage from "./pages/NavigationPage";
import SorryPage from "./pages/SorryPage";
import { CookiesProvider } from "react-cookie";
import { useLiff } from "./hooks";

const App = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/sorry">
            <SorryPage />
          </Route>
          <CookiesProvider>
            <NavigationPage />
          </CookiesProvider>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
