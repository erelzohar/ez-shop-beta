import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { HttpClient } from '@angular/common/http';
import CategoryModel from 'src/app/models/category-model';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

    public product = new ProductModel();
    public imageVisited: boolean;
    public categories: CategoryModel[];

    constructor(
        private myProductsService: ProductsService,
        private notify: NotifyService,
        private http: HttpClient,
        private env:environment
    ) { }

    async ngOnInit() {
        this.categories = await this.http.get<CategoryModel[]>(this.env.urls.productsUrl + "categories").toPromise();
    }

    public saveImage(args: Event): void {
        this.product.image = (args.target as HTMLInputElement).files;
    }

    public imageBlur(): void {
        this.imageVisited = true;
    }

    public async send() {
        try {
            await this.myProductsService.addProduct(this.product);
            this.notify.success("Product has been added.");
            this.product = new ProductModel();
        }
        catch (err) {
            this.notify.error(err);
        }
    }

}
