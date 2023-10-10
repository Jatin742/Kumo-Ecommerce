import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../Constants/cartConstant";
import axios from "axios";

const host=process.env.REACT_APP_BACKEND_HOST;
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(
        `${host}/api/v1/product/${id}`,
        { withCredentials: true }
    );
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity,
        }
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });
    localStorage.setItem("shippingInfo", JSON.stringify(data));
}