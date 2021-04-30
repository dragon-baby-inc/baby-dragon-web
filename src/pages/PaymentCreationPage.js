import React, { useState, useContext, useEffect } from "react"
import { NavLink, Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import PaymentSwipeableView from '../components/PaymentSwipeableView/PaymentSwipeableView'
import DotGroup from '../components/FormElements/DotGroup/DotGroup'
import RadioSelectMenu from '../components/FormElements/SelectMenu/RadioSelectMenu'
import PopUpForm from '../components/FormElements/PopUpForm/PopUpForm'
import CheckboxSelectMenu from '../components/FormElements/SelectMenu/CheckboxSelectMenu'
import Backdrop from '../components/Backdrop/Backdrop'
import { Context } from '../contexts/PaymentContext'
import useUsers from '../hooks/useUsers'
import useAccountingBook from '../hooks/useAccountingBook'
import { Context as AuthContext } from '../contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid'

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
  },
  back: {
    position: 'absolute',
    left: 0,
    top: 0,
    color: 'white',
    textDecoration: "none",
    padding: '20px',
  }
}

const titles = ['加入帳款', '加入還款']
const PaymentCreationPage = (props) => {
  const history = useHistory();
  const { state, setHidden, setPayer, setAccountingBookDetails } = useContext(Context)
  const { state: authState } = useContext(AuthContext)
  const [users, accountingBookDetails] = useAccountingBook()
  const [index, useIndex] = useState(0)

  useEffect(() => {
    let payer = users.filter(u => String(u.id) === authState.userLineIdToken)[0]
    if (payer) { setPayer(payer) }
    setAccountingBookDetails(accountingBookDetails)
  }, [users, authState, accountingBookDetails])

  const afterSubmit = () => {
    history.push(`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/payments`)
  }

  return(
    <div style={styles.bg}>
      <Link
        style={styles.back}
        to={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/payments`}>
        <FontAwesomeIcon icon={faArrowLeft} color='white'/>
      </Link>
      <div style={styles.header}>{titles[index]}</div>
      <DotGroup dotSize={2} index={index}/>
      <PaymentSwipeableView
        afterSubmit={afterSubmit}
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
            objects={state.owers.value}
            selected_object_id={state.radioSelectObjectId}
            changed={state.radioSelectAction}
          /> :
          null
      }
      {
        state.showPopUpForm ?
          <PopUpForm
            labelType="user"
            objects={users}
            selected_objects={state.popUpObjects}
            changed={state.popUpAction}
          /> :
          null
      }
      { state.showBackdrop ? <Backdrop clicked={setHidden}/> : null}
    </div>
  )
}

export default PaymentCreationPage
// https://3fa9ccb43ede.ngrok.io/liff_entry/groups/43b08acb-2b05-4366-8479-2268897f33c6/accounting_books/0a3a9b65-0475-4b68-8bcb-00e88bfe3022/payments/new
