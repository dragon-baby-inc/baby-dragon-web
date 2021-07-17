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
import ArrowLeft from '../components/IconLinks/ArrowLeft/ArrowLeft'

const styles = {
  bg: {
    background: `linear-gradient(90deg, rgba(16,60,43,1) 0%, rgba(7,105,77,1) 100%)`,
    width: '100vw',
    height: '100vh',
    maxHeight: '-webkit-fill-available',
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
  const { state, resetForm, setDisableForm, setBuilder, setHidden, setPayer, setAccountingBookDetails, setOwers } = useContext(Context)
  const { state: authState } = useContext(AuthContext)
  const [users, accountingBookDetails, loading] = useAccountingBook()
  const [index, useIndex] = useState(0)

  useEffect(() => {
    return resetForm
  }, [])

  useEffect(() => {
    if (!loading) {
      let payer = users.filter(u => String(u.id) === authState.userLineIdToken)[0]
      if (payer) { setPayer(payer) }
      setBuilder(users[0])
//       if (!payer) { alert('未授權') }

      setAccountingBookDetails(accountingBookDetails)
      setOwers(users)
      setDisableForm(false)
    }
  }, [users, authState, accountingBookDetails, loading])

  const afterSubmit = () => {
    history.push(`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/payments`)
  }

  return(
    <div style={styles.bg}>
      <ArrowLeft link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/payments`} color='white'/>
      <div style={styles.header}>{titles[index]}</div>
      <DotGroup dotSize={2} index={index}/>
      <PaymentSwipeableView
        index={state.paid_back ? 1 : 0}
        loading={loading}
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
