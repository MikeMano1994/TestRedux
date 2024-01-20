import { CART_FAILURE, CART_SUCCESS, } from "../actions/type";
import cartData from './getLocalData'
const initialState = cartData
  ? {cart: cartData }
  : {cart: null };
export default auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_SUCCESS:
      return {
        ...state,
        cart: payload.cart,
      };
    case CART_FAILURE:
      return {
        ...state,
        cart: null,
      };
    default:
      return {
        ...state
      };
  }
};