import { ProductsService } from './../../../services/products.service';
import {  AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import store from 'src/app/redux/store';
import CategoryModel from 'src/app/models/category-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CartComponent } from '../cart/cart.component';
import { Unsubscribe } from 'redux';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit , OnDestroy{

    public isAdmin: boolean = store.getState().authState.user.isAdmin;
    public products: ProductModel[] ;
    public minimize: boolean = false;
    public categories: CategoryModel[];
    public textToSearch: string;
    public unsubscribe:Unsubscribe;

    constructor(
        private myProductsService: ProductsService,
        private notify: NotifyService,
        private myHttp: HttpClient,
    ) { }

    async ngOnInit() {
        try {
            this.products = await this.myProductsService.getAllProducts();
            this.unsubscribe = store.subscribe(async()=>{
                this.products = store.getState().productsState.products;
            });
            this.categories = await this.myHttp.get<CategoryModel[]>(environment.productsUrl + "categories").toPromise();
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    ngOnDestroy(){
        this.unsubscribe();
    }

    public maximizeCart() {
        this.minimize = !this.minimize;
        document.getElementById("appCart").style.gridColumn = 'span 3';
        document.getElementById("productList").style.gridColumn = 'span 2';
        document.getElementById("appCart").style.width =  '100%';

    }

    public minimizeCart() {
        this.minimize = !this.minimize;
        document.getElementById("appCart").style.gridColumn = 'span 0';
        document.getElementById("productList").style.gridColumn = 'span 5';
        document.getElementById("appCart").style.width =  '0px';

    }

    public displayCategory(category: CategoryModel) {
        this.products = category.products;
        this.textToSearch = "";
    }

    public displayAll() {
        this.products = store.getState().productsState.products;
        this.textToSearch = "";
    }

    public search() {
        this.products = store.getState().productsState.products.filter(p => p.productName.toLowerCase().includes(this.textToSearch.toLowerCase()));
        if (this.products.length === 0) {
            this.notify.error("No such product...");
            this.products = store.getState().productsState.products;
        }
    }

}
