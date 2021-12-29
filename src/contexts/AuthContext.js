import createDataContext from './CreateDataContext'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'set_login':
      return { ...state, userLineIdToken: action.payload.userLineId, accessToken: action.payload.accessToken };
    default:
      return state;
  }
}

const setLogin = dispatch => ({ accessToken, userLineId }) => {
  dispatch({ type: 'set_login', payload: { userLineId, accessToken } })
}

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    setLogin
  },
  {
    userLineIdToken: null,
    accessToken: null
  }
)
