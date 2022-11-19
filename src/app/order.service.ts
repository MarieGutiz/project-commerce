import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Order from './models/order.model';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase,
               private shoppingCartService:ShoppingCartService,
               private routerService:Router) { }

 async placeOrder(order:Order){//fix  
   await this.db.list<Order>('/orders').push(order)
      .once("value").then(async result=>{
       await this.shoppingCartService.clearCart();
        this.routerService.navigate(['/order-success', result.key!]);
      })
        
  }
  getOrders(){
   return this.db.list('/orders').valueChanges() as Observable<Order[]>;//work
  }
  getAll():Observable<Order[]>{
    return this.db.list<AngularFireList<Order[]>>('/orders').snapshotChanges().pipe(
      map(changes =>        
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    );
  }

  getOrdersByUser(userId:string):Observable<Order[]>{
 
  return this.db.list<AngularFireList<Order[]>>('/orders',ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges().pipe(
    map(changes =>        
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  );
   }


}