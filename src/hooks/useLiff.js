import { useState, useEffect } from 'react';
import liff from '@line/liff';

const useLiff =  (callback) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    liff.init({ liffId: process.env.REACT_APP_LINE_LIFF_ID })
      .then(() => {
          setIsLoggedIn(true)
        if (!liff.getAccessToken()) {
//           liff.login({ redirectUri: window.location })
        } else {
          setIsLoggedIn(true)
          callback(liff.getDecodedIDToken().sub)
        }
      })
  }, [])

  return [isLoggedIn];
}

export default useLiff;
