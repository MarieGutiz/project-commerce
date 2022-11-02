import { Component, Input } from '@angular/core';
import Product from '../models/product.model';
import ShoppingCarts from '../models/shopping-cart.model';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{
@Input('product') product!:Product;
@Input('show-actions') showActions =true;
@Input('shoppping-carts') shoppingCart!:ShoppingCarts;

  constructor(private cartService:ShoppingCartService) { }

  addToCart(){
    this.cartService.addToCart(this.product);
  }
  // getQuantity(){
  //   let item ;
  //   if(!this.shoppingCart)//work
  //      return 0;
       
  //    item=  this.shoppingCart.items?.find(x => x.key === this.product.key)

  //   return item ? item.quantity : 0
  // }

  
}
