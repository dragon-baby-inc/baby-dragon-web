import { useState, useEffect } from 'react';
import liff from '@line/liff';
import { createDragonBabyApi } from '../api/dragonBabyApi'

const useLiff =  (callback) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let api = createDragonBabyApi(null)

  const stub = process.env.NODE_ENV === 'development'

  useEffect(() => {
    if (stub) {
      api.exchangeToken('', '')
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
          liff.login({ redirectUri: `https://www.dragonbaby.net${window.location.pathname}` })
        } else {
          api.exchangeToken(liff.getAccessToken(), liff.getDecodedIDToken())
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
