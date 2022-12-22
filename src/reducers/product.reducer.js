import { productConstants } from "../actions/constants";

const initialState = {
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    case productConstants.GET_User_PRODUCTS_SUCCESS:
      state = {
        ...state,
        loading: false,
        products: action.payload.products,
      };
      break;
  }

  return state;
};
