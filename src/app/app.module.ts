import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import {firebase} from 'src/ssl';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShopingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    LoginComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(firebase),
    RouterModule.forRoot([
      {path:'' , component:HomeComponent},
      {path:'products' , component:ProductsComponent},
      {path:'shopping-cart' , component:ShopingCartComponent},
      {path:'check-out' , component:CheckOutComponent},
      {path:'order-success' , component:OrderSuccessComponent},
      {path:'my/orders' , component:MyOrdersComponent},
      {path:'login' , component:LoginComponent},
      {path:'admin/products' , component:AdminProductsComponent},
      {path:'admin/orders' , component:AdminOrdersComponent},
    ]),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
