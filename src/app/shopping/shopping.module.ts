import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShopingCartComponent } from './components/shopping-cart/shoping-cart.component';



@NgModule({
  declarations: [
    MyOrdersComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ShopingCartComponent,
    ProductFilterComponent,    
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([

      {path:'products' , component:ProductsComponent},
      {path:'shopping-cart' , component:ShopingCartComponent},
      {path:'check-out' , component:CheckOutComponent, canActivate:[ AuthGuard ]},
      {path:'order-success/:id' , component:OrderSuccessComponent , canActivate:[ AuthGuard ]},
      {path:'my/orders' , component:MyOrdersComponent, canActivate:[ AuthGuard ]},
    ]),
  ]
})
export class ShoppingModule { }
