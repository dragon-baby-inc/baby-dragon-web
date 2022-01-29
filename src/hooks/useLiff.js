import { useState, useEffect } from 'react';
import liff from '@line/liff';
import { createDragonBabyApi } from '../api/dragonBabyApi'

const useLiff =  (callback) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let api = createDragonBabyApi(null)

  const stub = process.env.NODE_ENV === 'development'

  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.includes('groupAccountingBooks')) {
        localStorage.removeItem(key);
      }
      if (key.includes('accountingBookUsers')) {
        localStorage.removeItem(key);
      }
      if (key.includes('accountingBook')) {
        localStorage.removeItem(key);
      }
      if (key.includes('groupCurrentBook')) {
        localStorage.removeItem(key);
      }
    })
  }, [])


  useEffect(() => {
    if (stub) {
      api.exchangeToken('', '')
        .then((res) => {
          if (!res.data.message) {
            callback({ userLineId: res.data.user_line_id, accessToken: res.data.token })
            setIsLoggedIn(true)
          } else {
            alert(res.data.message)
            liff.closeWindow()
          }
        })
        .catch((err) => {
          if (err.response) {
            alert(err.response.data.message)
            liff.closeWindow()
          }
          console.log(err)
        })

      return
    }

    liff.init({ liffId: process.env.REACT_APP_LINE_LIFF_ID })
      .then(() => {
        if (!liff.getAccessToken()) {
          liff.login({ redirectUri: `${process.env.REACT_APP_WEB_HOST}${window.location.pathname}` })
        } else {
          api.exchangeToken(liff.getAccessToken(), liff.getDecodedIDToken())
            .then((res) => {
              if (!res.data.message) {
                callback({ userLineId: res.data.user_line_id, accessToken: res.data.token })
                setIsLoggedIn(true)
              } else {
                alert(res.data.message)
              }
            })
            .catch((err) => {
              if (err.response) {
                alert(err.response.data.message)
              }
              console.log(err)
            })
        }
      })
  }, [])

  return [isLoggedIn];
}

export default useLiff;
