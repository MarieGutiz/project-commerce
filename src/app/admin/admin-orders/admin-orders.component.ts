import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Order from 'src/app/models/order.model';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  order$: Observable<Order[]>;
 // orders$: Observable<Order[]>;

  constructor(private orderService:OrderService) { 
    this.order$ = this.orderService.getOrders()            
  }

  ngOnInit(): void {
  }

  

}
