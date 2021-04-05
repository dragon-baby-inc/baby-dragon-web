import createDataContext from './CreateDataContext'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'set_login':
      return { ...state, userLineIdToken: action.payload };
    default:
      return state;
  }
}

const setLogin = dispatch => (token) => {
  dispatch({ type: 'set_login', payload: token })
}

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    setLogin
  },
  {
    userLineIdToken: null
  }
)
