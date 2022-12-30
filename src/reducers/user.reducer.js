import { authConstants, userContants } from "../actions/constants";
import { UPDATE_BIO, GET_USER } from "../actions/user.action";
const initState = {
  user: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case userContants.GET_USER_SUCCESS:
      state = {
        ...state,
        user: action.payload,
      };
      break;
  }

  return state;
};
