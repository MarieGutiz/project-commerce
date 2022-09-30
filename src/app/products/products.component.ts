import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Product from '../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 products$!:Observable<Product[]>;

  constructor(private productService:ProductService) { 
    this.products$ = this.productService.getAll()
  }

  ngOnInit(): void {
  }

}
