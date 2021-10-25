import createDataContext from './CreateDataContext'
import axios from '../api/dragonBabyApi'

const AccountingBookReducer = (state, action) => {
  switch (action.type) {
    case 'set_name':
      return { ...state, name: { value: action.payload } };
    case 'set_auto_detect_payment':
      return { ...state, autoDetectPayment: { value: action.payload } };
    case 'set_line_notification':
      return { ...state, lineNotification: { value: action.payload } };
    case 'set_current':
      return { ...state, current: { value: action.payload } };
    default:
      return state;
  }
}

const setName = dispatch => (name) => {
  dispatch({ type: 'set_name', payload: name })
}

const setAutoDetectPayment = dispatch => (value) => {
  dispatch({ type: 'set_auto_detect_payment', payload: value })
}

const setLineNotification = dispatch => (value) => {
  dispatch({ type: 'set_line_notification', payload: value })
}

const setCurrent = dispatch => (value) => {
  dispatch({ type: 'set_current', payload: value })
}

export const { Context, Provider } = createDataContext(
  AccountingBookReducer,
  {
    setName,
    setAutoDetectPayment,
    setLineNotification,
    setCurrent,
  },
  {
    name: { value: null, valid: null },
    autoDetectPayment: { value: null, valid: null },
    lineNotification: { value: null, valid: null },
    current: { value: null, valid: null },
  }
)
