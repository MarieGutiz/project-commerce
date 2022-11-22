import Product from "./product.model";
import ShoppingCartItems, { TotalItemsCart } from "./shopping-cart-items.model";

export default class ShoppingCarts{
    totalItems:TotalItemsCart[]=[]
    constructor(public key:string, public dateCreated:number, public items:ShoppingCartItems[]){ 
       items?.forEach(item => {
          this.totalItems.push(new TotalItemsCart({
            ...item
          }))
       });
    }

    public get totalItemsCount(){     
         let count =0;
      this.items?.forEach(item => {
            if(item.quantity)
             count+= item.quantity
       });
        return count;
    }

    // public get ProductsIds(){
    //   //if(!this.items) return 
    //   return Object.keys(this.items);
    // }


    get totalPrice(){
      let total=0;
     this.items.forEach(item => {
      total+= item.product?.price! * item.quantity!
     });


     return total;
  }

  getQuantity(product:Product){
   let item ;
      
    item=  this.totalItems?.find(x => x.key === product.key)

   return item ? item.quantity : 0
 }
}

