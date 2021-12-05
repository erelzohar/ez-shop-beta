import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import store from 'src/app/redux/store';
import CartModel from '../models/cart-model';
import { cartAddedAction, cartDeletedAction, cartsDownloadedAction } from '../redux/cart-state';
import CartItemModel from '../models/cart-item-model';
import { allCartItemsDeletedAction, cartItemAddedAction, cartItemDeletedAction, cartItemsDownloadedAction } from '../redux/cart-items-state';
import OrderModel from '../models/order-model';

@Injectable({
    providedIn: 'root'
})
export class CartsService {

    constructor(private http: HttpClient) { }

    // Get all carts: 
    public async getAllCarts() {
        if (store.getState().cartsState.carts.length === 0) {
            const carts = await this.http.get<CartModel[]>(environment.cartsUrl).toPromise();
            store.dispatch(cartsDownloadedAction(carts));
        }
        return store.getState().cartsState.carts;
    }

    // Get all cart items: 
    public async getCartItems(cartId: string) {
        if (store.getState().cartItemsState.cartItems.length === 0 && cartId) {
            const cartItems = await this.http.get<CartItemModel[]>(environment.cartItemsUrl + cartId).toPromise();
            store.dispatch(cartItemsDownloadedAction(cartItems));
        }
        return store.getState().cartItemsState.cartItems;
    }

    // Get one cart: 
    public async getOneCart(customerId: string) {
        if (store.getState().cartsState.carts.length === 0) {
            const carts = await this.http.get<CartModel[]>(environment.cartsUrl).toPromise();
            store.dispatch(cartsDownloadedAction(carts));
        }
        const cart = store.getState().cartsState.carts.find(c => c.customerId === customerId);
        return cart;
    }

    // Add cart: 
    public async addCart(cart: CartModel) {
        const addedCart = await this.http.post<CartModel>(environment.cartsUrl, cart).toPromise();
        store.dispatch(cartAddedAction(addedCart));
        return addedCart;
    }

    // Add cart item: 
    public async addCartItem(cartItem: any) {
        const myFormData: FormData = CartItemModel.convertToFormData(cartItem);
        const addedCartItem = await this.http.post<CartItemModel>(environment.cartItemsUrl, myFormData).toPromise();
        store.dispatch(cartItemAddedAction(addedCartItem));
        return addedCartItem;
    }

    // Delete cart: 
    public async deleteCart(_id: string) {
        await this.http.delete(environment.cartsUrl + _id).toPromise();
        store.dispatch(cartDeletedAction(_id));
    }

    // Delete cart item: 
    public async deleteCartItem(_id: string) {
        await this.http.delete(environment.cartItemsUrl + _id).toPromise();
        store.dispatch(cartItemDeletedAction(_id));
    }

    // Delete all cart item: 
    public async deleteAllCartItems(cartId: string) {
        await this.http.delete(environment.cartItemsUrl + "delete/" + cartId).toPromise();
        store.dispatch(allCartItemsDeletedAction(cartId));
    }

    public async postOrder(order: OrderModel) {
        const formData: FormData = OrderModel.convertToFormData(order);
        return await this.http.post<OrderModel>(environment.ordersUrl, formData).toPromise();
    }

}
