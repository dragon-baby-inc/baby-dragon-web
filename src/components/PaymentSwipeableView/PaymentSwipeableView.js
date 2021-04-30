import React, { useContext } from 'react';
import SwipeableViews from 'react-swipeable-views';
import NewPaymentForm from '../Forms/NewPaymentForm'
import PaidBackPaymentForm from '../Forms/PaidBackPaymentForm'
import './PaymentSwipeableView.scss'
import { Context } from '../../contexts/PaymentContext'

const styles = {
  root: {
    padding: '0 15px',
    flexGrow: 1,
  },
  slideContainer: {
    padding: '0 5px',
    height: '100%',
  },
  slide: {
    padding: 20,
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: '34px',
    borderTopLeftRadius: '34px'
  },
};

const PaymentSwipeableView = (props) => {
  const { setPaidBack } = useContext(Context)
  const handleIndexChanged = (index, indexLatest, meta) => {
    let paidBack = index === 1 ? true : false
    setPaidBack(paidBack)
    props.changed(index)
  }
  return ( <SwipeableViews style={styles.root}
      slideStyle={styles.slideContainer}
      onChangeIndex={handleIndexChanged}
    >
      <div style={Object.assign({}, styles.slide)}>
        <NewPaymentForm users={props.users} afterSubmit={props.afterSubmit}/>
      </div>
      <div style={Object.assign({}, styles.slide)}>
        <PaidBackPaymentForm users={props.users} afterSubmit={props.afterSubmit}/>
      </div>
    </SwipeableViews>
  );
}

export default PaymentSwipeableView;
