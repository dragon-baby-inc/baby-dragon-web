import { useState, useEffect } from 'react';
import liff from '@line/liff';
import { dragonBabyApi } from '../api/dragonBabyApi'

const useLiff =  (callback) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    liff.init({ liffId: process.env.REACT_APP_LINE_LIFF_ID })
      .then(() => {
        setIsLoggedIn(true)
        if (!liff.getAccessToken()) {
          liff.login({ redirectUri: `https://baby-dragon-web.herokuapp.com${window.location.pathname}` })
//           liff.login({ redirectUri: `https://dragon-baby-api.jp.ngrok.io${window.location.pathname}` })
        } else {
          dragonBabyApi.exchangeToken(liff.getAccessToken(), liff.getDecodedIDToken())
            .then((res) => {
              console.log(res)
              callback({ userLineId: res.data.user_line_id, accessToken: res.data.token })
              setIsLoggedIn(true)
            })
            .catch((err) => {
//               liff.closeWindow()
              console.log(err)
            })
        }
      })
  }, [])

  return [isLoggedIn];
}

export default useLiff;
