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
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { NgxValidateCoreModule } from '@ngx-validate/core';

import { DataTableModule } from 'angular-datatables-all-versions';
import { ErrorComponent } from './error-comp/error.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrderService } from './order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { StandardTableComponent } from './standard-table/standard-table.component';


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
    AdminOrdersComponent,
    ProductFormComponent,
    ErrorComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    StandardTableComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxValidateCoreModule.forRoot({
      blueprints: {
        invalidUsername: 'The username "{{value}}" is taken.',
        invalidImage: 'The url "{{value}}" is invalid.',
      },
      errorTemplate: ErrorComponent,
      targetSelector: '.form-group',
    }),
    DataTableModule.forRoot(),

    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      {path:'' , component:ProductsComponent},
      {path:'products' , component:ProductsComponent},
      {path:'shopping-cart' , component:ShopingCartComponent},
      {path:'login' , component:LoginComponent},

      {path:'check-out' , component:CheckOutComponent, canActivate:[ AuthGuard ]},
      {path:'order-success/:id' , component:OrderSuccessComponent , canActivate:[ AuthGuard ]},
      {path:'my/orders' , component:MyOrdersComponent, canActivate:[ AuthGuard ]},
     
      
      {path:'admin/products/new' , component:ProductFormComponent , canActivate:[ AuthGuard , AdminAuthGuard]},
      {path:'admin/products/:id' , component:ProductFormComponent , canActivate:[ AuthGuard , AdminAuthGuard]},
      {path:'admin/products' , component:AdminProductsComponent , canActivate:[ AuthGuard , AdminAuthGuard]},
      
      {path:'admin/orders' , component:AdminOrdersComponent, canActivate:[ AuthGuard , AdminAuthGuard]},
    ]),
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  entryComponents: [ErrorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }