import createDataContext from './CreateDataContext'

const filterPaymentReducer = (state, action) => {
  switch (action.type) {
    case 'set_name':
      return { ...state, name: { value: action.payload } };
    default:
      return state;
  }
}

const setName = dispatch => (name) => {
  dispatch({ type: 'set_name', payload: name })
}

export const { Context, Provider } = createDataContext(
  filterPaymentReducer,
  {
    setName
  },
  {
    name: { value: null, valid: null },
    payer: { value: null, valid: null }
  }
)
