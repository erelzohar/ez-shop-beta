import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import CartModel from 'src/app/models/cart-model';
import OrderModel from 'src/app/models/order-model';
import ProductModel from 'src/app/models/product.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

    constructor(
        private myNotify: NotifyService,
        private myHttp: HttpClient,
        private myProductsService: ProductsService,
        private myCartsService: CartsService
    ) { }


    public user: UserModel;
    public userCart: CartModel = new CartModel();
    private unsubscribe: Unsubscribe;
    public orders: OrderModel[] = [];
    public products: ProductModel[] = [];
    public isNewCart: boolean = false;
    public isNewUser: boolean = false;
    public userOrder: OrderModel;


    async ngOnInit() {
        try {
            this.unsubscribe = store.subscribe(async() => {
                this.user = store.getState().authState.user;
                this.userCart = await this.myCartsService.getOneCart(this.user?._id);
                if (this.user) {
                    this.isNewCart = store.getState().cartItemsState.cartItems.length === 0;
                    this.userOrder = this.orders.find(o => o.customerId === this.user._id);
                }
            });

            this.orders = await this.myHttp.get<OrderModel[]>("https://cors-proxy-s.herokuapp.com/https://ez-shop-beta.herokuapp.com/api/orders/").toPromise();
            this.products = await this.myProductsService.getAllProducts();
        }
        catch (err) {
            this.myNotify.error(err);
        }
    }


    ngOnDestroy() {
        this.unsubscribe();
    }



}
