import { Component, Input, OnInit } from '@angular/core';
import { DataTableResource } from 'angular-datatables-all-versions';
import { Subscription } from 'rxjs';
import Order from '../models/order.model';

@Component({
  selector: 'standard-table',
  templateUrl: './standard-table.component.html',
  styleUrls: ['./standard-table.component.css']
})
export class StandardTableComponent implements OnInit {


  subscription?:Subscription;

  itemCount = 0;
  limits = [10, 20, 40, 80];
  tableResource!:DataTableResource<Order>;

  items!: Order[];
  @Input('orders') orders!:Order[];
  counts = 4;
  constructor() {
   }

  ngOnInit(): void {
    this.initalizeTable(this.orders);
  }
   

  private initalizeTable(orders:Order[]){
    this.tableResource = new DataTableResource(orders);
    this.tableResource.query({offset:0})
        .then( items=>{
          this.items = items;
        })

        this.tableResource.count().then(count => {
          this.itemCount = count
        });  
  }
  filter(query:string){
   console.log(query);
     let filteredProducts = (query)?
       this.orders?.filter(o=>o.shipping?.firstName?.toLowerCase().includes(query.toLowerCase())):
       this.orders
       
       if(!filteredProducts) return;
       this.initalizeTable(filteredProducts);
  }
  
reloadItems(params:any) {
  if(!this.tableResource) return;
    this.tableResource.query(params).then(items => this.items = items);
 }
 
 // special properties:
 rowClick(rowEvent:any) {
   console.log('Clicked: ' + rowEvent.row.item.name);
 }
 
 rowDoubleClick(rowEvent:any) {
   alert('Double clicked: ' + rowEvent.row.item.name);
 }
 
 rowTooltip(item:any) {
   return item;
 }

}
