import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { productAddedAction, productDeletedAction, productsDownloadedAction, productUpdatedAction } from 'src/app/redux/products-state';
import store from 'src/app/redux/store';
import ProductModel from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) { }

    // Get all products: 
    public async getAllProducts() {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.http.get<ProductModel[]>("https://cors-proxy-s.herokuapp.com/https://ez-shop-beta.herokuapp.com/api/products/").toPromise();
            store.dispatch(productsDownloadedAction(products));
        }
        return store.getState().productsState.products;
    }

    // Get one product: 
    public async getOneProduct(_id: string) {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch(productsDownloadedAction(products));
        }
        const product = store.getState().productsState.products.find(p => p._id === _id);
        return product;
    }

    // Add product: 
    public async addProduct(product: ProductModel) {
        const myFormData: FormData = ProductModel.convertToFormData(product);
        const addedProduct = await this.http.post<ProductModel>(environment.productsUrl, myFormData).toPromise();
        store.dispatch(productAddedAction(addedProduct));
        return addedProduct;
    }

    // Update product: 
    public async updateProduct(product: ProductModel) {
        const myFormData: FormData = ProductModel.convertToFormData(product);
        const updatedProduct = await this.http.put<ProductModel>(environment.productsUrl + product._id , myFormData).toPromise();
        store.dispatch(productUpdatedAction(updatedProduct));
        return updatedProduct;
    }

    // Delete product: 
    public async deleteProduct(_id: string) {
        await this.http.delete(environment.productsUrl + _id).toPromise();
        store.dispatch(productDeletedAction(_id));
    }

}
