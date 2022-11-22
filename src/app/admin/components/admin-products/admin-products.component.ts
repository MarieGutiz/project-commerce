import { Component, OnInit } from '@angular/core';
import { DataTableResource } from 'angular-datatables-all-versions';
import { Subscription } from 'rxjs';
import Product from 'shared/models/product.model';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products?:Product[];
  subscription?:Subscription;

  itemCount = 0;
  limits = [10, 20, 40, 80];
  tableResource!:DataTableResource<Product>;
  items!: Product[];

  constructor(private productService:ProductService) {
    this.retrieveProducts();
   }

  ngOnInit(): void {
  }
   
   retrieveProducts(): void {
 
    this.productService.getAll().subscribe(data => {
      this.products = data;
      this.initalizeTable(data)
    });
  }
  private initalizeTable(products:Product[]){
     
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset:0})
        .then( items=>{
          this.items = items;
        })

        this.tableResource.count().then(count => {
          this.itemCount = count
        });  
  }
  filter(query:string){
   //  console.log(query);
     let filteredProducts = (query)?
       this.products?.filter(p=>p.title?.toLowerCase().includes(query.toLowerCase())):
       this.products
       
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
   return item.price;
 }
}
