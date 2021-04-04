import createDataContext from './CreateDataContext'

const paymentReducer = (state, action) => {
  switch (action.type) {
    case 'set_name':
      return { ...state, name: action.payload }
    case 'set_amount':
      return { ...state, amount: action.payload }
    case 'set_paid_back':
      return { ...state, paid_back: action.payload }
    case 'set_payer':
      return { ...state, payer: action.payload }
    case 'set_owers':
      return { ...state, owers: action.payload }
    case 'set_hidden':
      return { ...state,
        showCheckboxSelect: false,
        showRadioSelect: false,
        showBackdrop: false,
      }
    case 'set_allocation_type':
      return { ...state, allocation_type: action.payload }
    case 'set_show_checkbox_select':
      return { ...state,
        showCheckboxSelect: true,
        showBackdrop: true,
        checkboxSelectAction: action.payload.action,
        checkboxSelectObjectIds: action.payload.ids,
      }
    case 'set_show_radio_select':
      return { ...state,
        showRadioSelect: true,
        showBackdrop: true,
        radioSelectAction: action.payload.action,
        radioSelectObjectId: action.payload.id,
      }
    default:
      return state;
  }
}

const setName = dispatch => (name) => {
  dispatch({ type: 'set_name', payload: name })
}
const setAmount = dispatch => (amount) => {
  dispatch({ type: 'set_amount', payload: amount })
}

const setPaidBack = dispatch => (boolean) => {
  dispatch({ type: 'set_paid_back', payload: boolean })
}

const setPayer = dispatch => (payer) => {
  dispatch({ type: 'set_payer', payload: payer })
  dispatch({ type: 'set_hidden' })
}

const setOwers = dispatch => (owers) => {
  dispatch({ type: 'set_owers', payload: owers })
}

const setAllocationType = dispatch => (type) => {
  dispatch({ type: 'set_allocation_type', payload: type })
}

const setShowRadioSelect = dispatch => (action, id) => {
  dispatch({
    type: 'set_show_radio_select',
    payload: { action, id }
  })
}

const setShowCheckboxSelect = dispatch => (action, ids) => {
  dispatch({
    type: 'set_show_checkbox_select', payload: { action, ids }
  })
}
const setHidden = dispatch => () => {
  dispatch({ type: 'set_hidden' })
}

export const { Context, Provider } = createDataContext(
  paymentReducer,
  {
    setName,
    setAmount,
    setPaidBack,
    setPayer,
    setOwers,
    setHidden,
    setAllocationType,
    setShowCheckboxSelect,
    setShowRadioSelect
  },
  {
    name: null,
    amount: null,
    paid_back: false,
    allocation_type: 'evenly',
  }
)
