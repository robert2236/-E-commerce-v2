import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const carSidebarSlice = createSlice({
    name: 'sidebar',
    initialState: [],
    reducers: {
      setSidebar: (state, action) => {
        return action.payload
      }
    }
})

export const sidebarThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then((res) => dispatch(setSidebar(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addProductThunk = (products) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart", products, getConfig())
        .then(() => dispatch(sidebarThunk()))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
}

export const purchaseCar = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", {}, getConfig())
        .then(() => dispatch(setSidebar([])))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setSidebar } = carSidebarSlice.actions;

export default carSidebarSlice.reducer;
