import React, { useState, useContext, useEffect } from "react"
import PaymentSwipeableView from '../components/PaymentSwipeableView/PaymentSwipeableView'
import DotGroup from '../components/FormElements/DotGroup/DotGroup'
import RadioSelectMenu from '../components/FormElements/SelectMenu/RadioSelectMenu'
import CheckboxSelectMenu from '../components/FormElements/SelectMenu/CheckboxSelectMenu'
import Backdrop from '../components/Backdrop/Backdrop'
import { Context } from '../contexts/PaymentContext'
import useUsers from '../hooks/useUsers'
import useAccountingBook from '../hooks/useAccountingBook'
import { Context as AuthContext } from '../contexts/AuthContext'

const styles = {
  bg: {
    background: `linear-gradient(90deg, rgba(16,60,43,1) 0%, rgba(7,105,77,1) 100%)`,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexFlow: 'column',
    textAlign: 'center',
  },
  header: {
    display: 'block',
    size: '20px',
    lineHeight: '42px',
    fontWeight: '900',
    color: '#FFFFFF',
  }
}

const titles = ['加入帳款', '加入還款']
const PaymentCreationPage = (props) => {
  const { state, setHidden, setPayer, setAccountingBookDetails } = useContext(Context)
  const { state: authState } = useContext(AuthContext)
  const [users, accountingBookDetails] = useAccountingBook()
  const [index, useIndex] = useState(0)

  useEffect(() => {
    let payer = users.filter(u => String(u.id) === authState.userLineIdToken)[0]
    if (payer) { setPayer(payer) }
    setAccountingBookDetails(accountingBookDetails)
  }, [users, authState, accountingBookDetails])

  return(
    <div style={styles.bg}>
      <div style={styles.header}>{titles[index]}</div>
      <DotGroup dotSize={2} index={index}/>
      <PaymentSwipeableView
        changed={useIndex}
        users={users}
      />
      {
        state.showCheckboxSelect ?
          <CheckboxSelectMenu
            labelType="user"
            objects={users}
            selected_object_ids={state.checkboxSelectObjectIds}
            changed={state.checkboxSelectAction}
          /> : null
      }
      {
        state.showRadioSelect ?
          <RadioSelectMenu
            labelType="user"
            objects={users}
            selected_object_id={state.radioSelectObjectId}
            changed={state.radioSelectAction}
          /> :
          null
      }
      { state.showBackdrop ? <Backdrop clicked={setHidden}/> : null}
    </div>
  )
}

export default PaymentCreationPage
