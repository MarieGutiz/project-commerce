import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import ShoppingCarts from '../models/shopping-cart.model';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent{
  appUser!:AppUser
  toggleBtn:boolean =false;

  subscription$?:Subscription
  carts!: ShoppingCarts;
  cart$!: Observable<ShoppingCarts>;

  constructor(private auth:AuthService, private shoppingCartService:ShoppingCartService) { 
   this.auth.appUser$.subscribe(user=> this.appUser =user)
    this.auth.appUser$.pipe(
      switchMap(user =>{
        this.appUser = user;
        return this.shoppingCartService.getCart();
      })
    ).subscribe(shc=>{
      this.cart$ = shc;
    })
  }
//   async ngOnInit() {
//     this.subscription$ = (await this.shoppingCartService.getCart()).subscribe(cart=> {    
//      if(cart)
//       this.cart = cart


   
//  }
//  ngOnDestroy(): void {
//    this.subscription$?.unsubscribe();
// }

  logout(){
   this.auth.logout();
  }
  toggle(){
    this.toggleBtn = !this.toggleBtn;
  }
}
