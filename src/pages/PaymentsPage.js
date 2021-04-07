import React, { useState, useContext, useEffect } from "react"
import { Context } from '../contexts/PaymentContext'
import { Context as AuthContext } from '../contexts/AuthContext'

const styles = {
}

const PaymentsPage = (props) =>
{ const { state, setHidden, setPayer } = useContext(Context)
  const { state: authState } = useContext(AuthContext)

  return(
    <div style={styles.bg}>
      PaymentPage
    </div>
  )
}

export default PaymentsPage
