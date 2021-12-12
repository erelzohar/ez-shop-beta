import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import ProductModel from 'src/app/models/product.model';
import CartItemModel from 'src/app/models/cart-item-model';
import { Unsubscribe } from 'redux';
import CartModel from 'src/app/models/cart-model';
import { environment } from 'src/environments/environment';
import { CartsService } from 'src/app/services/carts-service.service';
import { NotifyService } from 'src/app/services/notify.service';
import OrderModel from 'src/app/models/order-model';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HighlightSearch } from 'src/app/services/highlight-search.pipe';


@Component({
    selector: 'app-order',
    providers: [History, HighlightSearch],
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

    constructor(
        private myProductService: ProductsService,
        private myCartsService: CartsService,
        private myNotifyService: NotifyService,
        private myRouter: Router,
        private http: HttpClient,
    ) { }


    public orders: OrderModel[];
    public order = new OrderModel();
    public user: UserModel = store.getState().authState.user;
    public userCart: CartModel;
    public products: ProductModel[];
    public cartItems: CartItemModel[];
    public unsubscribe: Unsubscribe;
    public totalCartPrice: number = 0;
    public imageUrl = environment.productImagesUrl;
    public textToSearch: string;


    async ngOnInit() {
        try {
            this.orders = await this.http.get<OrderModel[]>(environment.ordersUrl).toPromise();
            this.products = await this.myProductService.getAllProducts();
            this.userCart = await this.myCartsService.getOneCart(this.user._id);
            this.cartItems = await this.myCartsService.getCartItems(this.userCart._id);
            this.cartItems.forEach(c => { this.totalCartPrice += c.price });
            this.unsubscribe = store.subscribe(async () => {
                this.cartItems = store.getState().cartItemsState.cartItems;
                this.totalCartPrice = 0;
                this.cartItems.forEach(c => { this.totalCartPrice += c.price });
            });
        }

        catch (err: any) {
            this.myNotifyService.error(err.message);
        }
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    public findImage(productId: string) {
        let imageName = this.products.find(p => p._id === productId)?.imageName;
        if (!imageName)
            return "not-found";

        return this.imageUrl + imageName;

    }

    public async sendOrder() {
        try {
            this.order.orderDate = new Date().getDate().toLocaleString() +
                "/" + (new Date().getMonth() + 1).toLocaleString() +
                "/" + new Date().getFullYear().toLocaleString().replace(',', '');
            if (this.orders.filter(o => o.dateToDeliver === this.order.dateToDeliver).length === 3)
                return this.myNotifyService.error("Chosen date is unavailable.");
            this.order.cartId = this.userCart._id;
            this.order.customerId = this.user._id;
            this.order.finalPrice = this.totalCartPrice;
            await this.myCartsService.postOrder(this.order);
            this.myNotifyService.success("Order Submited!");
            this.myRouter.navigateByUrl("/recipt");
        }
        catch (err: any) {
            this.myNotifyService.error(err.message);
        }
    }
    public onChange() {
        // this.cartItems = this.cartItems.map(c => {
        //     console.log(c, this.textToSearch)
        //     c.productName = this.highlight.transform(c.productName, this.textToSearch);
        //     console.log(c)
        //     return c;
        // });

    }
    public fillInputs() {
        this.order.city = this.user.city;
        this.order.street = this.user.street;
    }
}
