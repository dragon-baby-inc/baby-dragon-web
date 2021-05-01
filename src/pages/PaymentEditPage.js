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
import usePayment from '../hooks/usePayment'
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

const titles = ['編輯帳款', '編輯還款']
const PaymentCreationPage = (props) => {
  const history = useHistory();
  const {
    state,
    setHidden,
    setPayer,
    setAccountingBookDetails,
    setOwer,
    setOwers,
    setManualOwers,
    setName,
    setAllocationType,
    setCreationDate,
    setFixedAmount,
    setAmount,
    setPaidBack,
    setBuilder,
    setDisableForm,
    setId,
    resetForm

  } = useContext(Context)
  const { state: authState } = useContext(AuthContext)
  const [users, accountingBookDetails, loading] = useAccountingBook()
  const [payment, paymentLoading] = usePayment()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    return resetForm
  }, [])

  useEffect(() => {
    if (!loading && !paymentLoading) {
      setId(payment.id)

      let payer = users.filter(u => String(u.id) === payment.payer_id)[0]
      if (payer) { setPayer(payer) }

      let builder = users.filter(u => String(u.id) === authState.userLineIdToken)[0]
      setBuilder(users[0])
//       if (!builder) { alert('未授權') }

      setAmount(parseFloat(payment.amount))
      setName(payment.description)
      setPaidBack(payment.paid_back)
      setCreationDate(payment.created_at)

      if (payment.paid_back) {
        let ower = users.filter(u => u.id == payment.allocations[0].ower_id)[0]
        setOwer(ower)
        setFixedAmount(payment.amount)
      }

      if (payment.allocation_type == 'evenly') {
        let ower_ids = payment.allocations.map(a => a.ower_id)
        setOwers(users.filter(u => ower_ids.includes(String(u.id))))
        setAllocationType(payment.allocation_type)
      } else if (payment.allocation_type == 'amount'){
        let owers = users.map(user => {
          let ower = payment.allocations.filter(a => a.ower_id == user.id)[0]
          if (ower) { user['amount'] = ower.amount }
          return user
        })
        setManualOwers(owers)
        setAllocationType(payment.allocation_type)
      }
      setAccountingBookDetails(accountingBookDetails)
      setDisableForm(false)
    }
  }, [authState, loading, paymentLoading])

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
        index={state.paid_back ? 1 : 0}
        loading={loading}
        afterSubmit={afterSubmit}
        changed={setIndex}
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
