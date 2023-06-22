import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { userLoggedInAction, userLoggedOutAction, userRegisteredAction } from 'src/app/redux/auth-state';
import store from 'src/app/redux/store';
import { CredentialsModel } from '../models/credentials.model';
import { UserModel } from '../models/user.model';
import CartModel from '../models/cart-model';
import { cartAddedAction, cartsDownloadedAction } from '../redux/cart-state';
import { NotifyService } from './notify.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private notyf: NotifyService,
        private env: environment
    ) {}

    public async createCart(user: UserModel) {
        const addedCart = this.http.post<CartModel>(this.env.urls.cartsUrl, {
            "customerId": user._id,
            "creationDate": new Date().getDate().toLocaleString() +
                "/" + (new Date().getMonth() + 1).toLocaleString() +
                "/" + new Date().getFullYear().toLocaleString().replace(',', '')
        }).toPromise();
        store.dispatch(cartAddedAction(await addedCart));
        return addedCart;
    }

    public async register(user: UserModel) {
        const myFormData = UserModel.convertToFormData(user);
        const addedUser = await this.http.post<UserModel>(this.env.urls.registerUrl, myFormData).toPromise();
        const addedCart = await this.createCart(addedUser);
        store.dispatch(userRegisteredAction(addedUser));
        store.dispatch(cartAddedAction(addedCart));
        setTimeout(() => {
            store.dispatch(userLoggedOutAction());
            this.notyf.error("Your login session has expired");
        }, 60000 * 59);
        return addedUser;
    }

    public async login(credentials: CredentialsModel) {
        const myFormData = CredentialsModel.convertToFormData(credentials);
        const loggedInUser = await this.http.post<UserModel>(this.env.urls.loginUrl, myFormData).toPromise();
        const carts = await this.http.get<CartModel[]>(this.env.urls.cartsUrl).toPromise();
        store.dispatch(userLoggedInAction(loggedInUser));
        store.dispatch(cartsDownloadedAction(carts));
        setTimeout(() => {
            store.dispatch(userLoggedOutAction());
            this.notyf.error("Your login session has expired");
        }, 60000 * 59);
        if (!carts.find(c => c.customerId === loggedInUser._id))
            this.createCart(loggedInUser);
        return loggedInUser;

    }

    public logout() {
        store.dispatch(userLoggedOutAction());
    }

}
