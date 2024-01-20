import { CART_SUCCESS,CART_FAILURE } from "./type";
import AuthService from "../services/authService";
export const cartListData = (cart) => (dispatch) => {
  return AuthService.cartData(cart).then(
    (response) => {
        dispatch({
          type: response.status === "success" ? CART_SUCCESS : CART_FAILURE,
          payload: { cart: response.cart },
        });
        Promise.resolve();
        return response;
    },
    (error) => {
      const message = error.toString();
      Promise.reject();
      return message;
    }
  );
};
export const clear = () => (dispatch) => {
  return AuthService.clearData().then(
    (response) => {
        dispatch({
          type: response.status === "success" ? CART_SUCCESS : CART_FAILURE,
          payload: { cart: response.cart },
        });
        Promise.resolve();
        return response;
    },
    (error) => {
      const message = error.toString();
      Promise.reject();
      return message;
    }
  );
};