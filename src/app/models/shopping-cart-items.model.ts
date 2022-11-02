import Product from "./product.model"

export default interface ShoppingCartItems{
    key?:string | null;
    product?:Product;
    quantity?:number;
    
}

export  class TotalItemsCart{
    key?:string | null;
    product?:Product;
    quantity?:number;

    constructor(init?: Partial<TotalItemsCart>){
        Object.assign(this, init)
    }
    
    get totalPrice(){
        return this.product?.price! * this.quantity!
    }
}
