import createDataContext from './CreateDataContext'

const paymentReducer = (state, action) => {
  switch (action.type) {
    case 'set_name':
      return { ...state, name: action.payload }
    case 'set_amount':
      return { ...state, amount: action.payload }
    case 'set_paid_back':
      return { ...state, paid_back: action.payload }
    case 'set_allocation_type':
      return { ...state, allocation_type: action.payload }
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

const setAllocationType = dispatch => (type) => {
  dispatch({ type: 'set_allocation_type', payload: type })
}

export const { Context, Provider } = createDataContext(
  paymentReducer,
  {
    setName,
    setAmount,
    setPaidBack,
    setAllocationType
  },
  {
    name: null,
    amount: null,
    paid_back: false,
    allocation_type: 'evenly'
  }
)
