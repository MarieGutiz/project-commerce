import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CategoryService } from '../category.service';
import Category from '../models/category.model';
import Product from '../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 products?:Product[] = [];
 filteredProducts?:Product[] = [];

  category: string | null =" ";
  categories$: Observable<Category[]>;
  categories?: Category[]=[];
  categoryName?: Category = new Category;
  
  constructor(route:ActivatedRoute,    
              private productService:ProductService,
              private categoryService:CategoryService) { 
      

                
      this.categories$ = this.categoryService.getAll();
      this.productService.getAll().pipe(
        switchMap(products=>{
           this.products = products;
           this.categories$.subscribe(c=>this.categories = c)
           return route.queryParamMap;
        })
      ).subscribe(
        params =>{
          this.category = params.get('category');
                 
          this.filteredProducts = (this.category)?
              this.products?.filter( p=>{
                return p.category! === this.category}):
              this.products
          
          this.categoryName = this.categories?.find(c => c.key === this.category)  
          if(this.categoryName?.name) 
            this.category = this.categoryName.name
        }
      )
         
   
  }

  ngOnInit(): void {
  }

}
