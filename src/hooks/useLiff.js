import { useState, useEffect } from 'react';
import liff from '@line/liff';
import { dragonBabyApi } from '../api/dragonBabyApi'

const useLiff =  (callback) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const stub = false
  useEffect(() => {
    if (stub) {
      dragonBabyApi.exchangeToken("any", "any")
        .then((res) => {
          callback({ userLineId: res.data.user_line_id, accessToken: res.data.token })
          setIsLoggedIn(true)
        })

      return
    }

    liff.init({ liffId: process.env.REACT_APP_LINE_LIFF_ID })
      .then(() => {
        setIsLoggedIn(true)
        if (!liff.getAccessToken()) {
          liff.login({ redirectUri: `https://baby-dragon-web.herokuapp.com${window.location.pathname}` })
        } else {
          dragonBabyApi.exchangeToken(liff.getAccessToken(), liff.getDecodedIDToken())
            .then((res) => {
              callback({ userLineId: res.data.user_line_id, accessToken: res.data.token })
              setIsLoggedIn(true)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
  }, [])

  return [isLoggedIn];
}

export default useLiff;
