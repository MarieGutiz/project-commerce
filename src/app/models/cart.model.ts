import ShoppingCartItems from "./shopping-cart-items.model";

export default interface cart {
  key?: string | null; 
  dateCreated?:Date;
  items? :ShoppingCartItems[]
}
