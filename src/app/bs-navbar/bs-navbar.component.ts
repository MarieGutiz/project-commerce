import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import ShoppingCarts from '../models/shopping-cart.model';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser!:AppUser
  toggleBtn:boolean =false;
  cart$?:Observable<ShoppingCarts>
  totalItem!: number;

  subscription$?:Subscription
  cart!: ShoppingCarts;

  constructor(private auth:AuthService, private shoppingCartService:ShoppingCartService) { 
    this.auth.appUser$.subscribe(user=> this.appUser =user)
  }
  async ngOnInit(): Promise<void> {
   
   this.cart$ = (await this.shoppingCartService.getCart())

  
  }
//   async ngOnInit() {
//     this.subscription$ = (await this.shoppingCartService.getCart()).subscribe(cart=> {    
//      if(cart)
//       this.cart =cart
//    })
   
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
