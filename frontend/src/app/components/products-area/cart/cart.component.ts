import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import CartItemModel from 'src/app/models/cart-item-model';
import CartModel from 'src/app/models/cart-model';
import ProductModel from 'src/app/models/product.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { CartsService } from 'src/app/services/carts-service.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

    constructor(
        private myNotifyService: NotifyService,
        private myCartsService: CartsService,
        private myProductService: ProductsService,
        private myAuthService: AuthService
    ) { }

    public user: UserModel = store.getState().authState?.user;
    public userCart: CartModel;
    public products: ProductModel[];
    public cartItems: CartItemModel[] = [];
    public unsubscribe: Unsubscribe;
    public totalCartPrice: number = 0;
    public imageUrl = environment.productImagesUrl;
    public add :boolean = false;

    @Input()
    public minimize: boolean;

    @Input()
    public minimizeCart: Function;

    @Input()
    public maximizeCart: Function;

    async ngOnInit() {
        try {
            this.products = await this.myProductService.getAllProducts()
            this.userCart = await this.myCartsService.getOneCart(this.user?._id);
            if (!this.userCart)
                await this.myAuthService.createCart(this.user);
            if (this.user?.isAdmin) return;
            this.cartItems = await this.myCartsService.getCartItems(this.userCart?._id);
            this.cartItems.forEach(c => { this.totalCartPrice += c.price });
            this.unsubscribe = store.subscribe(async () => {
                this.cartItems = store.getState().cartItemsState.cartItems;
                this.totalCartPrice = 0;
                this.cartItems.forEach(c => { this.totalCartPrice += c.price });
            });
        }
        catch (err) {
            this.myNotifyService.error(err.message);
        }
    }


    ngOnDestroy() {
        if (!this.user?.isAdmin)
            this.unsubscribe();
    }

    public async resetCart() {
        try {
            let ok = window.confirm("Reset your cart?");
            if (!ok) return;
            await this.myCartsService.deleteAllCartItems(this.userCart._id);
            this.myNotifyService.success("Your cart has been reset!");
        }
        catch (err) {
            this.myNotifyService.error(err.message);
        }
    }

    public findImage(productId: string) {
        let imageName = this.products.find(p => p._id === productId)?.imageName;
        return imageName;
    }

    public async deleteItem(itemId: string) {
        await this.myCartsService.deleteCartItem(itemId);
    }
}
