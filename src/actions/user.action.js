import { authConstants, userContants } from "./constants";
import axios from "../helpers/axios";

export const userInfo = (user) => {
  console.log(user);

  return async (dispatch) => {
    dispatch({ type: userContants.GET_USER_REQUEST });
    const res = await axios.get(`/:uid`, {
      ...user,
    });

    if (res.status === 201) {
      const { message } = res.data;
      dispatch({
        type: userContants.GET_USER_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userContants.GET_USER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
