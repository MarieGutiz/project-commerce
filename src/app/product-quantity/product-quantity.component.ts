import { Component, Input } from '@angular/core';
import Product from '../models/product.model';
import ShoppingCarts from '../models/shopping-cart.model';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  @Input('product') product?:Product;
  @Input('shoppping-cart') shoppingCart!:ShoppingCarts;
  
    constructor(private cartService:ShoppingCartService) { }
  
    addToCart(){
      this.cartService.addToCart(this.product!);
    }
    // getQuantity(){
    //   let item ;
    //   if(!this.shoppingCart)//work
    //      return 0;
         
    //    item=  this.shoppingCart.items?.find(x => x.key === this.product.key)
  
    //   return item ? item.quantity : 0
    // }
  
    removeFromCart(){
       this.cartService.removeFromCart(this.product!)
    }

  

}
