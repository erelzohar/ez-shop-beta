import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { OrderComponent } from './components/orders-area/order/order.component';
import { ReciptComponent } from './components/orders-area/recipt/recipt.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { Page404Component } from './components/shared-area/page404/page404.component';
import { AdminGuard } from './services/admin.guard';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "logout", canActivate: [AuthGuard], component: LogoutComponent },
    { path: "products/:productId", canActivate: [AuthGuard], component: ProductListComponent,pathMatch:"full" },
    { path: "products", canActivate: [AuthGuard], component:ProductListComponent ,pathMatch:"full" },
    { path: "recipt", canActivate: [AuthGuard], component: ReciptComponent },
    { path: "order", canActivate: [AuthGuard], component: OrderComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" }, // pathMath: "full" --> exact
    { path: "**", component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
