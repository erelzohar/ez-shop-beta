import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CartModel from 'src/app/models/cart-model';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { CartsService } from 'src/app/services/carts-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public credentials = new CredentialsModel();
    public user: UserModel;
    public carts: CartModel[] = [];
    public userCart: CartModel;
    public isNew: boolean = false;

    constructor(
        private myAuthService: AuthService,
        private notify: NotifyService,
        private myCartsService: CartsService,
        private myRouter:Router
    ) { }

    public async ngOnInit() {

        try {
            this.carts = await this.myCartsService.getAllCarts();

            if (store.getState().authState.user) {
                this.user = store.getState().authState.user;
                if(this.user.isAdmin) this.myRouter.navigateByUrl("/products");
                this.userCart = await this.myCartsService.getOneCart(this.user._id);
                if(!this.userCart) await this.myAuthService.createCart(this.user);
                let cartItems =await this.myCartsService.getCartItems(this.userCart._id);
                this.isNew = (this.carts[this.carts.length - 1].customerId === this.user._id && cartItems.length === 0);
            }
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    public async login() {
        try {
            if (!this.credentials.email || !this.credentials.password)
                throw new Error("Please complete all fields");
            this.user = await this.myAuthService.login(this.credentials);
            this.userCart = await this.myCartsService.getOneCart(this.user._id);
            this.isNew = (this.carts[this.carts.length - 1].customerId === this.user._id);
            this.notify.success("Logged-in");
            if(this.user.isAdmin)this.myRouter.navigateByUrl("/products")
        }
        catch (err) {
            this.notify.error(err);
        }
    }

}
