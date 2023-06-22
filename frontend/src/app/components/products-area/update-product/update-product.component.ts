import { ProductsService } from './../../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import CategoryModel from 'src/app/models/category-model';
import { Location } from '@angular/common';

@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

    public product :ProductModel;
    public categories: CategoryModel[] = [];
    public update: boolean = false;

    constructor(
        private myProductsService: ProductsService,
        private myRouter: Router,
        private notify: NotifyService,
        private http: HttpClient,
        private location: Location,
        private env:environment
    ) { }

    async ngOnInit() {
        // const startRouter
        this.categories = await this.http.get<CategoryModel[]>(this.env.urls.productsUrl + "categories").toPromise();
        this.myRouter.events.subscribe(async event => {
            if (event instanceof NavigationEnd && this.location.path().length > 30 && this.location.path().substring(0, 10) === "/products/") {
                this.product = await this.myProductsService.getOneProduct(this.location.path().substring(10))
                this.update = true;
                console.log(event,this.update)
            }
        });
    }

    public async send() {
        try {
            console.log(this.product)
            await this.myProductsService.updateProduct(this.product);
            this.notify.success("Product has been updated.");
            this.myRouter.navigateByUrl("/products");
        }
        catch (err) {
            this.notify.error(err);
        }
    }

}
