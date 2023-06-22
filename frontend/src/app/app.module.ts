import { HighlightSearch } from './services/highlight-search.pipe'
import { UpdateProductComponent } from './components/products-area/update-product/update-product.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home-area/home/home.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { LogoComponent } from './components/layout-area/logo/logo.component';
import { Page404Component } from './components/shared-area/page404/page404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PleaseWaitComponent } from './components/shared-area/please-wait/please-wait.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { DetailsComponent } from './components/home-area/details/details.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { CartComponent } from './components/products-area/cart/cart.component';
import { ProductDialogComponent } from './components/products-area/product-dialog/product-dialog.component';
import { OrderComponent } from './components/orders-area/order/order.component';
import { ReciptComponent } from './components/orders-area/receipt/receipt.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { environment } from 'src/environments/environment';



@NgModule({
    declarations: [
        HomeComponent,
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        LayoutComponent,
        HeaderComponent,
        LogoComponent,
        Page404Component,
        PleaseWaitComponent,
        ProductListComponent,
        ProductCardComponent,
        DetailsComponent,
        AuthMenuComponent,
        CartComponent,
        ProductDialogComponent,
        OrderComponent,
        ReciptComponent,
        UpdateProductComponent,
        AddProductComponent,
        HighlightSearch

    ],
    entryComponents:[ProductDialogComponent],
        imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgbModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatDialogModule,
        BackButtonDisableModule.forRoot({
            preserveScrollPosition:true
        }),
        HttpClientJsonpModule
    ],
    providers: [
        environment,
        {
        provide: HTTP_INTERCEPTORS, 
        useClass: JwtInterceptor, 
        multi: true
    }],
    bootstrap: [LayoutComponent]
})
export class AppModule { }
