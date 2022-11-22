import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import ShoppingCarts from 'shared/models/shopping-cart.model';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {
  cart$!: Observable<ShoppingCarts>;

  constructor(private shoppingCartService:ShoppingCartService) { }

  async ngOnInit(): Promise<void> {
     this.cart$ = await this.shoppingCartService.getCart()

  }

  async clearCart(){
   await  this.shoppingCartService.clearCart();
  }

}
