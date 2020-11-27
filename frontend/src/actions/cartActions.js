import Axios from 'axios';
import { 
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS 
} from '../constants/cartConstants';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  dispatch({
    //Dispatch an action, add product to the cart
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// action to remove a product from the cart, input: productId
export const removeFromCart = (productId) => (dispatch, getState) =>{
  dispatch({type: CART_REMOVE_ITEM, payload: productId});
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) =>(dispatch) =>{
  dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data});
  localStorage.setItem('shippingAddress', JSON.stringify(data));
}