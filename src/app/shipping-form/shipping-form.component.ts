import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import cart from '../models/cart.model';
import Order from '../models/order.model';
import Shipping from '../models/shipping.model';
import ShoppingCarts from '../models/shopping-cart.model';
import { OrderService } from '../order.service';

const { minLength, required, requiredTrue, min ,pattern} = Validators;

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy{
  order:Order = new Order;
  shipping:Shipping = new Shipping; 
  shippingForm!:FormGroup

  userId: string | undefined;
  userSubscription!: Subscription;
  @Input('cart') cart!:ShoppingCarts;
  
  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private orderService:OrderService) {
   
   }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user?.uid)
    this.createForm();
  }

  createForm() {
    const shippingFb = this.fb.group({   
      firstName: [null, [required, minLength(2)]],
      lastName:  [null, [required, minLength(2)]],
      addressLine1:  [null, [required, minLength(4)]],
      addressLine2:  [null, [required, minLength(4)]],
      city:  [null, [required]],
      zip:[null, [required,min(0), minLength(4)]],
      country:[null, [required]],     

    });   
    
    this.shippingForm = this.fb.group({ shippingFb });
  }
  
  async placeOrder() {
    if(!this.shippingForm.valid) return
    this.getShipping();
    this.newOrder();       
    await this.orderService.placeOrder(this.order);
   
  }
  newOrder(){
    this.order.userId = this.userId;
    this.order.datePlaced = new Date().getTime();
    this.order.dateOrder = Date.now();
    this.order.shipping = this.shipping;    
   // this.order.shoppingCart = this.cart;

    let shoppingCart:cart = {
      key: this.cart.key,
      dateCreated: this.cart.dateCreated,
      items : this.cart.items
    }
    this.order.shoppingCart = shoppingCart
    this.order.itemsCount = this.cart.totalItemsCount;
    this.order.totalAmount = this.cart.totalPrice;
  }
   
  getShipping(){
   this.shipping.firstName = this.shippingForm.get('shippingFb.firstName')?.value;
   this.shipping.lastName = this.shippingForm.get('shippingFb.lastName')?.value;
   this.shipping.addressLine1 = this.shippingForm.get('shippingFb.addressLine1')?.value;
   this.shipping.addressLine2 = this.shippingForm.get('shippingFb.addressLine2')?.value;
   this.shipping.city = this.shippingForm.get('shippingFb.city')?.value;
   this.shipping.country = this.shippingForm.get('shippingFb.country')?.value;
   this.shipping.zipCode = this.shippingForm.get('shippingFb.zip')?.value;
  }
}
