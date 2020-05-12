import {HttpClient} from '../axios/axios';


const CartService = {

    getAllCarts: () => {
        return HttpClient.get("/cart");
    },
    addCart: (cart, token) => {
        return HttpClient.post(`/cart/create`, cart, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    },
    getCart: (id) => {
        return HttpClient.get(`/cart/${id}`);
    },
    deleteCart: (id) => {
        return HttpClient.delete(`/cart/${id}`,{
            headers: {
                'Content-Type': 'application/json'
            }});
    },
    updateCart: (request, token) => {
        debugger;
        return HttpClient.patch(`/cart/edit`, request,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }});
    },
    getAllOrders: (page,size) => {
        return HttpClient.get(`/cart/orders?page=${page}&size=${size}`);
    },
    getAllOrdersFromUser: (id) => {
        return HttpClient.get(`/cart/orders/${id}`);
    },
    getUserCart: (id) => {
        return HttpClient.get(`/cart/user/${id}`);
    },
    getProducts: (id) => {
        return HttpClient.get(`/cart/products/${id}`);
    },
    addProductToCart: (cartProductRequest, token) => {
        return HttpClient.post(`/cart/add`, cartProductRequest,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    },
    deleteProductFromCart: (id, token) => {
        return HttpClient.delete(`/cart/product/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },
    createOrder: (id, request) => {
        return HttpClient.post(`/cart/order/${id}`, request,{
            headers: {
                'Content-Type': 'application/json'
            }});
    },
    createOrderRequest: (request, token) => {
        return HttpClient.post(`/cart/order`, request,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }});
    }
};

export default CartService;
