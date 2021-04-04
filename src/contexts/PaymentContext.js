import createDataContext from './CreateDataContext'
import Validator from '../utilities/Validator'

const paymentReducer = (state, action) => {
  switch (action.type) {
    case 'set_name':
      let nameValid = action.payload.length > 0
      return { ...state, name: { value: action.payload, valid: nameValid } }
    case 'set_amount':
      let amountValid = action.payload.length > 0
      return { ...state, amount: { value:action.payload, valid: amountValid  } }
    case 'set_paid_back':
      return { ...state, paid_back: action.payload }
    case 'set_payer':
      let payerValid = action.payload ? true : false
      return { ...state, payer: { value: action.payload, valid: payerValid } }
    case 'set_owers':
      let owersValid = action.payload.length > 0
      return { ...state, owers: { value: action.payload, valid: owersValid } }
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
    case 'validate_form':
      return { ...state, ...action.payload };
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

const validations = {
  name: ['isString', 'isNotEmpty'],
  amount: ['isNotEmpty'],
  payer: ['isNotEmpty'],
  owers: ['isNotEmpty', 'atLeastOne']
}

const validateForm = dispatch => (state, formKeys) => {
  let validator = new Validator();
  let newState = {}
  let formValid = true

  formKeys.forEach(key => {
    let isKeyValid = true
    validations[key].forEach(valFunc => {
      if (!validator[valFunc](state[key].value)) {
        isKeyValid = false
        formValid = false
      }
      newState[key] = { value: state[key].value, valid: isKeyValid }
    })
  })
  newState['formValid'] = false
  console.log(newState)
  dispatch({ type: 'validate_form', payload: newState })
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
    setShowRadioSelect,
    validateForm,
  },
  {
    name: { value: null, valid: null },
    amount: { value: null, valid: null },
    payer: { value: null, valid: null },
    owers: { value: null, valid: null },
    paid_back: false,
    formValid: false,
    allocation_type: 'evenly',
  }
)
