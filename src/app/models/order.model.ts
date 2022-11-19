import cart from "./cart.model";
import Shipping from "./shipping.model";

export default class Order{
    key?:string | null;
    userId?:string;
    datePlaced?:number;
    dateOrder?: number;
    shipping?:Shipping;
    shoppingCart?:cart;
    itemsCount?:number;
    totalAmount?:number;
  
   
    
}