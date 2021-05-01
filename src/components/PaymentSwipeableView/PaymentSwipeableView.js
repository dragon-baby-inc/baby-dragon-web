import React, { useContext } from 'react';
import SwipeableViews from 'react-swipeable-views';
import NewPaymentForm from '../Forms/NewPaymentForm'
import PaidBackPaymentForm from '../Forms/PaidBackPaymentForm'
import './PaymentSwipeableView.scss'
import { Context } from '../../contexts/PaymentContext'

const styles = {
  root: {
    margin: 0,
    padding: '0 15px',
    height: 'calc(100% - 66px)',
    overflow: 'hidden',
  },
  slideContainer: {
    margin: 0,
    padding: '0 5px',
    height: '100%',
  },
  slide: {
    margin: 0,
    padding: '20px',
    overflow: 'hidden',
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
      index={props.index}
      slideStyle={styles.slideContainer}
      onChangeIndex={handleIndexChanged}
    >
      <div style={Object.assign({}, styles.slide)}>
        <NewPaymentForm loading={props.loading} users={props.users} afterSubmit={props.afterSubmit}/>
      </div>
      <div style={Object.assign({}, styles.slide)}>
        <PaidBackPaymentForm loading={props.loading} users={props.users} afterSubmit={props.afterSubmit}/>
      </div>
    </SwipeableViews>
  );
}

export default PaymentSwipeableView;
