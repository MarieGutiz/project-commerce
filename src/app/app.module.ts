import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { firebase } from 'ssl';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';


@NgModule({
  declarations: [
    AppComponent,   
    
  ],
  imports: [
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    // NgxValidateCoreModule.forRoot({
    //   blueprints: {
    //     invalidUsername: 'The username "{{value}}" is taken.',
    //     invalidImage: 'The url "{{value}}" is invalid.',
    //   },
    //   errorTemplate: ErrorComponent,
    //   targetSelector: '.form-group',
    // }),
   //  DataTableModule.forRoot(),

    AngularFireModule.initializeApp(firebase),
    // AngularFireAuthModule,
    // AngularFireDatabaseModule,
    RouterModule.forRoot([
      {path:'' , component:ProductsComponent},
      {path:'login' , component:LoginComponent},
    
    ]),
  ],
  providers: [
    
   
  ],
 // entryComponents: [ErrorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }