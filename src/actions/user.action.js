import axios from "../helpers/axios";
import { authConstants, userContants } from "./constants";
export const GET_USER = "GET_USER";

export const userInfo = (user) => {
  return async (dispatch) => {
    dispatch({ type: userContants.GET_USER_REQUEST });
    const res = await axios.get(`/${user}`, {
      ...user,
    });

    if (res.status === 200) {
      const { data } = res;

      dispatch({
        type: userContants.GET_USER_SUCCESS,
        payload: { data },
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

export const updateUser = (userId, data) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `http://localhost:5000/api/` + userId,
      data: { data },
    })
      .then((res) => {
        dispatch(userInfo(userId));
      })
      .catch((err) => console.log(err));
  };
};
