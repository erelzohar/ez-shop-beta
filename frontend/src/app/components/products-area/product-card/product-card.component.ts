import { Component, Input } from '@angular/core';
import ProductModel from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import { MatDialog } from "@angular/material/dialog";
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { CartsService } from 'src/app/services/carts.service';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

    constructor(
        private dialog: MatDialog,
        private myCartService: CartsService,
        private notify: NotifyService,
        private myRouter:Router
    ) { }

    @Input()
    public product: ProductModel;

    public user = store.getState().authState.user;
    public userCartId: string;
    public imageUrl = environment.productImagesUrl;


    public openDialog() {
        let dialogRef = this.dialog.open(ProductDialogComponent);

        dialogRef.afterClosed().subscribe(async result => {
            try {
                if (!result) return;
                this.userCartId = await (await this.myCartService.getOneCart(store.getState().authState.user._id))._id;
                let newCartItem = {
                    "productId": this.product._id,
                    "cartId": this.userCartId,
                    "productName": this.product.productName,
                    "amount": result,
                    "price": (result * this.product.price)
                };
                await this.myCartService.addCartItem(newCartItem);
                this.notify.success("Added!");

            }
            catch (err) {
                this.notify.error(err);
            }
        });
    }
    public edit() {
        this.myRouter.navigateByUrl("/products/" + this.product._id);
    }
}
