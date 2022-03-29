import createDataContext from "./CreateDataContext";
import { createDragonBabyApi } from "../api/dragonBabyApi";

const authReducer = (state, action) => {
  switch (action.type) {
    case "set_login":
      return {
        ...state,
        userLineIdToken: action.payload.userLineId,
        accessToken: action.payload.accessToken,
        api: createDragonBabyApi(action.payload.accessToken),
      };
    default:
      return state;
  }
};

const setLogin =
  (dispatch) =>
  ({ accessToken, userLineId }) => {
    dispatch({ type: "set_login", payload: { userLineId, accessToken } });
  };

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    setLogin,
  },
  {
    api: null,
    userLineIdToken: null,
    accessToken: null,
  }
);
