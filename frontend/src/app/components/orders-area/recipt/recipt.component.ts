import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { Unsubscribe } from 'redux';
import CartItemModel from 'src/app/models/cart-item-model';
import CartModel from 'src/app/models/cart-model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-recipt',
    templateUrl: './recipt.component.html',
    styleUrls: ['./recipt.component.css']
})
export class ReciptComponent implements OnInit {

    constructor(
        private myCartService: CartsService,
        private myRouter: Router,
        private myAuthService: AuthService,
        private notify: NotifyService
    ) { }

    public userCart: CartModel;
    public cartItems: CartItemModel[] = [];
    public user = store.getState().authState.user;
    public unsubscribe: Unsubscribe;
    public totalPrice: number = 0;

    async ngOnInit() {
        try {
            this.userCart = await this.myCartService.getOneCart(this.user?._id);
            this.cartItems = await this.myCartService.getCartItems(this.userCart._id);
            this.unsubscribe = store.subscribe(async () => {
                this.cartItems = store.getState().cartItemsState.cartItems;
            });
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    download() {
        this.cartItems.forEach(c => this.totalPrice += c.price);
        let file = new Blob([this.cartItems.map(
            c => "Product : " + c.productName + " |  Amount : " + c.amount + " |  Price : " + c.price + "$\n").toString() + "\n\n" + "Total : " + this.totalPrice.toString() + "$"], { type: '.txt' }
        );
        let a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = "Recipt-" + this.user.firstName + "-" + this.user.lastName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    public async redirect() {
        await this.myCartService.deleteAllCartItems(this.userCart._id);
        await this.myCartService.deleteCart(this.userCart._id);
        await this.myAuthService.createCart(this.user);
        this.myRouter.navigateByUrl("/home");
    }

}
