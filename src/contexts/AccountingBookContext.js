import createDataContext from "./CreateDataContext";
import Validator from "../utilities/Validator";

const AccountingBookReducer = (state, action) => {
  switch (action.type) {
    case "reset_form":
      return { ...initialState };
    case "set_image_id":
      return { ...state, imageId: { value: action.payload, valid: true } };
    case "set_name":
      return {
        ...state,
        name: { value: action.payload.name, valid: action.payload.valid },
      };
    case "set_currency":
      return {
        ...state,
        currency: { value: action.payload.value, valid: action.payload.valid },
      };
    case "set_users":
      return {
        ...state,
        users: { value: action.payload.value, valid: action.payload.valid },
      };
    case "set_auto_detect_payment":
      return { ...state, autoDetectPayment: { value: action.payload } };
    case "set_line_notification":
      return { ...state, lineNotification: { value: action.payload } };
    case "set_current":
      return { ...state, current: { value: action.payload } };
    case "validate_form":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const setUsers =
  (dispatch) =>
  ({ value, valid }) => {
    dispatch({ type: "set_users", payload: { value, valid } });
  };

const setCurrency =
  (dispatch) =>
  ({ value, valid }) => {
    dispatch({ type: "set_currency", payload: { value, valid } });
  };

const setImageId = (dispatch) => (id) => {
  dispatch({ type: "set_image_id", payload: id });
};

const setName = (dispatch) => (payload) => {
  if (payload) {
    dispatch({
      type: "set_name",
      payload: { name: payload.name, valid: payload.valid },
    });
  }
};

const setAutoDetectPayment = (dispatch) => (value) => {
  dispatch({ type: "set_auto_detect_payment", payload: value });
};

const setLineNotification = (dispatch) => (value) => {
  dispatch({ type: "set_line_notification", payload: value });
};

const setCurrent = (dispatch) => (value) => {
  dispatch({ type: "set_current", payload: value });
};

const resetContext = (dispatch) => () => {
  dispatch({ type: "reset_form" });
};

const validateForm = (dispatch) => (state, formKeys) => {
  let validator = new Validator();
  let newState = {};
  let formValid = true;

  formKeys.forEach((key) => {
    let isKeyValid = true;
    validations[key].forEach((valFunc) => {
      if (!validator[valFunc](state[key].value)) {
        isKeyValid = false;
        formValid = false;
      }
      newState[key] = { value: state[key].value, valid: isKeyValid };
    });
  });

  newState["formValid"] = formValid;
  dispatch({ type: "validate_form", payload: newState });
  return formValid;
};

const validations = {
  name: ["isString", "isNotEmpty"],
  imageId: ["isNotEmpty"],
  users: ["isNotEmpty", "atLeastOne"],
  currency: ["isNotEmpty"],
};

const initialState = {
  imageId: { value: 0, valid: true },
  name: { value: "", valid: null },
  autoDetectPayment: { value: true, valid: null },
  users: { value: [], valid: null },
  lineNotification: { value: true, valid: null },
  current: { value: false, valid: null },
  currency: { value: null, valid: null },
  formValid: null,
};

export const { Context, Provider } = createDataContext(
  AccountingBookReducer,
  {
    setUsers,
    setCurrency,
    setName,
    setAutoDetectPayment,
    setLineNotification,
    setCurrent,
    validateForm,
    setImageId,
    resetContext,
  },
  initialState
);
