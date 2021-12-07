import createDataContext from './CreateDataContext'
import Validator from '../utilities/Validator'
import { dragonBabyApi } from '../api/dragonBabyApi'

const paymentReducer = (state, action) => {
  let valid
  switch (action.type) {
    case 'set_accounting_book_details':
      return { ...state, accounting_book_details: action.payload }
    case 'reset_form':
      return { ...initialState }
    case 'set_id':
      return { ...state, id: action.payload }
    case 'set_name':
      let nameValid = action.payload.length > 0
      return { ...state, name: { value: action.payload, valid: nameValid } }
    case 'set_fixed_amount':
      let fixedAmountValid = action.payload > 0
      return { ...state, amount: { value:action.payload, valid: fixedAmountValid  } }
    case 'set_amount':
      let amountValid = action.payload > 0
      return { ...state, amount: { value:action.payload, valid: amountValid  } }
    case 'set_creation_date':
      let dateValid = action.payload ? true : false
      return { ...state, creation_date: { value:action.payload, valid: dateValid  } }
    case 'set_paid_back':
      return { ...state, paid_back: action.payload }
    case 'set_builder':
        return { ...state, builder: action.payload }
    case 'set_payer':
      valid = action.payload ? true : false
      if (state.ower.value === action.payload) {
        return { ...state, payer: { value: action.payload, valid: valid }, ower: { value: null, valid: null  } }
      } else {
        return { ...state, payer: { value: action.payload, valid: valid } }
      }
    case 'set_ower':
      valid = action.payload ? true : false
      if (state.payer.value === action.payload) {
        return { ...state, ower: { value: action.payload, valid: valid }, payer: { value: null, valid: false  } }
      } else {
        return { ...state, ower: { value: action.payload, valid: valid } }
      }
    case 'set_owers':
      let owersValid = action.payload.length > 0
      return { ...state, owers: { value: action.payload, valid: owersValid } }
    case 'set_manual_owers':
      let objects = action.payload.owers.filter(object => object.amount > 0)
      let amount = objects.reduce((prev, object) => {
        if (parseFloat(object.amount) > 0) { return prev + parseFloat(object.amount) }
        else { return (prev + 0) }
      }, 0)
      valid = action.payload.valid ? action.payload.valid : action.payload.owers.filter(ower => ower.amount > 0).length === action.payload.owers.length
      return { ...state, fixedAmount: { value: amount, valid: valid }, manualOwers: { value: action.payload.owers, valid: valid } }
    case 'set_hidden':
      return { ...state,
        showDatePicker: false,
        showCheckboxSelect: false,
        showRadioSelect: false,
        showBackdrop: false,
        showPopUpForm: false,
      }
    case 'set_allocation_type':
      return { ...state, allocation_type: action.payload }
    case 'set_show_date_picker':
      return { ...state,
        showDatePicker: true,
        showBackdrop: true,
        datePickerAction: action.payload.action,
        datePickerDate: action.payload.ids,
      }
    case 'set_show_checkbox_select':
      return { ...state,
        showCheckboxSelect: true,
        showBackdrop: true,
        checkboxSelectAction: action.payload.action,
        checkboxSelectObjectIds: action.payload.ids,
      }
    case 'set_show_pop_up_form':
      return { ...state,
        showPopUpForm: true,
        showBackdrop: true,
        popUpAction: action.payload.action,
        popUpObjects: action.payload.objects,
      }
    case 'set_disable_form':
      return { ...state, disableForm: action.payload.boolean }
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

const setId = dispatch => (id) => {
  dispatch({ type: 'set_id', payload: id })
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

const setBuilder = dispatch => (builder) => {
  dispatch({ type: 'set_builder', payload: builder })
}

const setOwer = dispatch => (ower) => {
  dispatch({ type: 'set_ower', payload: ower })
  dispatch({ type: 'set_hidden' })
}

const setOwers = dispatch => (owers) => {
  dispatch({ type: 'set_owers', payload: owers })
}

const setFixedAmount = dispatch => (amount) => {
  dispatch({ type: 'set_fixed_amount', payload: amount })
}

const setManualOwers = dispatch => ({ owers, valid }) => {
  dispatch({ type: 'set_manual_owers', payload: { owers, valid } })
}

const setCreationDate = dispatch => (date) => {
  dispatch({ type: 'set_creation_date', payload: date })
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

const setShowPopUpForm = dispatch => (action, objects) => {
  dispatch({
    type: 'set_show_pop_up_form', payload: { action, objects }
  })
}

const setDisableForm = dispatch => (action, boolean) => {
  dispatch({
    type: 'set_disable_form', payload: { action, boolean }
  })
}

const setShowDatePicker = dispatch => (action, date) => {
  dispatch({
    type: 'set_show_date_picker', payload: { action, date }
  })
}
const setHidden = dispatch => () => {
  dispatch({ type: 'set_hidden' })
}

const validations = {
  name: ['isString', 'isNotEmpty'],
  amount: ['isNotEmpty'],
  payer: ['isNotEmpty'],
  ower: ['isNotEmpty'],
  owers: ['isNotEmpty', 'atLeastOne'],
  manualOwers: ['atLeastOneValue'],
  creation_date: ['isNotEmpty']
}

const setAccountingBookDetails = dispatch => (details) => {
  dispatch({ type: 'set_accounting_book_details', payload: details })
}

const resetForm = dispatch => () => {
  dispatch({ type: 'reset_form' })
}

const validateForm = dispatch => (state, formKeys, callback) => {
  let validator = new Validator();
  let newState = { ...state }
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

  if (formKeys.includes('manualOwers')) {
    let isKeyValid = state['manualOwers'].value.filter(o => o.amount > 0).length === state['manualOwers'].value.length
    newState['manualOwers'] = { value: state['manualOwers'].value, valid: isKeyValid }
    formValid = isKeyValid
  }

  newState['formValid'] = formValid
  if (callback) { callback(newState) }
  dispatch({ type: 'validate_form', payload: newState })
  return formValid
}

const createPayment = dispatch => (state, afterSubmit) => {
  var moment = require('moment-timezone');
  let params = {
    id: state.id,
    description: state.name.value,
    amount: state.amount.value,
    payer_id: state.payer.value.id,
    allocation_type: state.allocation_type,
    created_at: state.creation_date.value,
    paid_back: state.paid_back,
    timezone: moment.tz.guess(),
    builder_id: state.builder.id
  }

  if (state.paid_back) {
    params['ower_ids'] = [state.ower.value.id]
    params['description'] = '還款'
  } else {
    if (state.allocation_type === 'amount') {
      params['amount'] = state.fixedAmount.value
      params['owers'] = state.manualOwers.value.filter(o => o.amount > 0).map(o => {
        return { ower_id: o.user.id, amount: o.amount }
      })
    } else {
      params['ower_ids'] = state.owers.value.map(o => o.id)
    }
  }

  let details = state.accounting_book_details

  dragonBabyApi.createPayment(details.group_id, details.id, params)
    .then(function (response) {
      console.log(response)
      afterSubmit()
    })
    .catch(function (error) {
      console.log(error)
      afterSubmit()
    })
}

let initialState = {
  id: null,
  builder: null,
  accounting_book_details: null,
  name: { value: '', valid: null },
  amount: { value: '', valid: null },
  fixedAmount: { value: 0, valid: null },
  payer: { value: null, valid: null },
  ower: { value: null, valid: null },
  owers: { value: [], valid: true },
  manualOwers: { value: [], valid: true },
  creation_date: { value: null, valid: null },
  paid_back: false,
  formValid: false,
  allocation_type: 'evenly',
  disableForm: true,
}

export const { Context, Provider } = createDataContext(
  paymentReducer,
  {
    setId,
    setName,
    setAmount,
    setPaidBack,
    setPayer,
    setOwers,
    setFixedAmount,
    setManualOwers,
    setOwer,
    setBuilder,
    setHidden,
    setCreationDate,
    setAllocationType,
    setShowCheckboxSelect,
    setShowRadioSelect,
    setShowPopUpForm,
    setDisableForm,
    validateForm,
    setShowDatePicker,
    setAccountingBookDetails,
    resetForm,
    createPayment,
  }, initialState
)
