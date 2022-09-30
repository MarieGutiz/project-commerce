import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import Product from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  constructor(private db: AngularFireDatabase) { 

  }
  create(product: any) {
   return this.db.list('/products').push(product);
  }

  getAll():Observable<Product[]> {
    return this.getList().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      )
    
  }

  getList(): AngularFireList<Product> {
    return this.db.list('/products');
  }

  getProducts(productId:string){
    return this.db.object('/products/'+productId).valueChanges() as Observable<Product>;
  }
  update(productId:string, product:any){
    return this.db.object('/products/'+productId).update(product);
  }
  delete(productId:string){
    return this.db.object('/products/'+productId).remove();
  }
}
