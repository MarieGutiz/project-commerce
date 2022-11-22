import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import ShoppingCarts from 'shared/models/shopping-cart.model';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})

export class CheckOutComponent implements OnInit{
 

  cart$!:Observable<ShoppingCarts>;  

  constructor(private shoppingService:ShoppingCartService){  }

  async ngOnInit(): Promise<void> {
   this.cart$ = await this.shoppingService.getCart();
   
  }
 
 
}
