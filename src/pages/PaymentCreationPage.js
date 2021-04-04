import React, { useState, useContext } from "react"
import PaymentSwipeableView from '../components/PaymentSwipeableView/PaymentSwipeableView'
import { themeColors } from '../constants/globalColors'
import DotGroup from '../components/FormElements/DotGroup/DotGroup'
import RadioSelectMenu from '../components/FormElements/SelectMenu/RadioSelectMenu'
import Backdrop from '../components/Backdrop/Backdrop'
import { Context } from '../contexts/PaymentContext'

const styles = {
  bg: {
    background: 'rgb(16,60,43)',
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

const PaymentCreationPage = () => {
  const { state } = useContext(Context)
  const [index, useIndex] = useState(0)
  const title = titles[index]

  return(
    <div style={styles.bg}>
      <div style={styles.header}>{title}</div>
      <DotGroup dotSize={2} index={index}/>
      <PaymentSwipeableView
        changed={useIndex}
      />
      <RadioSelectMenu />
      <Backdrop />
    </div>
  )
}

export default PaymentCreationPage
