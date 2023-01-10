import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { DataTableModule } from 'angular-datatables-all-versions';
import { AppRoutingModule } from 'app/app-routing.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { StandardTableComponent } from './components/standard-table/standard-table.component';
import { ErrorComponent } from './error-comp/error.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    StandardTableComponent,
    ErrorComponent,
    
  ],
  imports: [
    CommonModule,
    DataTableModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
    NgxValidateCoreModule.forRoot({
      blueprints: {
        invalidUsername: 'The username "{{value}}" is taken.',
        invalidImage: 'The url "{{value}}" is invalid.',
      },
      errorTemplate: ErrorComponent,
      targetSelector: '.form-group',
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgxSliderModule
    

  ],
  exports:[
    ProductCardComponent,
    ProductQuantityComponent,    
    StandardTableComponent,
    ErrorComponent, 
    NgxValidateCoreModule,

    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
    DataTableModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgxSliderModule
  ],
  providers:[
    AuthService,
    AuthGuard,   
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  entryComponents: [ErrorComponent]
})
export class SharedModule { }
