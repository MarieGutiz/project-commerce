import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import cart from './models/cart.model';

import Product from './models/product.model';
import ShoppingCartItems from './models/shopping-cart-items.model';
import ShoppingCarts from './models/shopping-cart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

 door=false;

  constructor(private db:AngularFireDatabase) { }


  private create():string{
       
     this.db.list('/shopping-carts').push({
         dateCreated: new Date().getTime()
       }).once("value").then(result=>{
           localStorage.setItem('cartId',result.key!);
           this.door=true;
           return result.key
           
       })
    return "";
  }
  
  clearCart() {
    let cartId =  this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+cartId+'/items').remove();
  }

  async getCart():Promise<Observable<ShoppingCarts>>{
    let cartId = this.getOrCreateCartId();
     //  console.log("cart Id "+cartId);
       let items:ShoppingCartItems[];
       let T= this.getAllItems(cartId!).pipe(
          switchMap(it=>{
            items = it
            return this.getInsight(cartId!) 
          }
        ),
        map(changer=>{
            changer.items = items
          // Object.assign
          const S = new ShoppingCarts(changer.key!, changer.dateCreated!, changer.items)
            return S
        })
        )
    
  return T;
  }
  async  removeFromCart(product:Product){
     this.updateItem(product, -1);
    }
    async addToCart(product:Product){
      this.updateItem(product, 1);
      
    }

  private getAllItems(cartId:string):Observable<ShoppingCartItems[]>{
     return this.db.list<AngularFireObject<ShoppingCartItems>>('/shopping-carts/'+cartId+"/items").snapshotChanges().pipe(
      map(changes =>        
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    );
  }

  private getInsight(cartId:string):Observable<cart>{
    return this.db.object<AngularFireObject<cart>>('/shopping-carts/'+cartId).snapshotChanges().pipe(
      map(changer=>{
      return ({ key: changer.payload.key, ...changer.payload.val() })         
       
      })
    )
  }  
  
  private getItem(cartId:string, productId:string){
    return this.db.object('/shopping-carts/'+cartId+'/items/'+productId)
  }
  private getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
   
    let result 
    if(!this.door){
      result = this.create();

    }    
      return result
    
  }

 
  private async updateItem(product:Product, change:number){
    let cartId =  this.getOrCreateCartId();
    let item$ =this.getItem(cartId!,product.key!);
    
   item$.snapshotChanges().pipe(take(1)).subscribe(item =>{
     let qtity = item.payload.child("quantity").val() ||  0;
     let sumQty =qtity+change;

     if(sumQty === 0)
       item$.remove();
     else{
      item$.update({product: product, quantity:sumQty})
       }
   })
  }
}
