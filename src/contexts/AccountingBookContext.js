import createDataContext from './CreateDataContext'

const AccountingBookReducer = (state, action) => {
  switch (action.type) {
    case 'set_image_id':
      return { ...state, imageId: { value: action.payload, valid: true } };
    case 'set_name':
      return { ...state, name: { value: action.payload.name, valid: action.payload.valid } };
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

const setImageId = dispatch => (id) => {
  dispatch({ type: 'set_image_id', payload: id })
}

const setName = dispatch => (payload) => {
  if (payload) {
    dispatch({ type: 'set_name', payload: { name: payload.name, valid: payload.valid } })
  }
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
    setImageId,
  },
  {
    imageId: { value: 0, valid: true },
    name: { value: '', valid: null },
    autoDetectPayment: { value: true, valid: null },
    lineNotification: { value: true, valid: null },
    current: { value: false, valid: null },
  }
)
