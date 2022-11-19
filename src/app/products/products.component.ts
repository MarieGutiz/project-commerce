import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CategoryService } from '../category.service';
import Category from '../models/category.model';
import Product from '../models/product.model';
import ShoppingCarts from '../models/shopping-cart.model';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 products?:Product[] = [];
 filteredProducts?:Product[] = [];

  category: string | null =" ";
  categories$?: Observable<Category[]>;
  categories?: Category[]=[];
  categoryName?: Category = new Category;
  
  toggleBtn:boolean =false;
  cart$!: Observable<ShoppingCarts>;
 // subscription$?:Subscription
 // cart!: ShoppingCarts;
 //@Output() newItemEvent = new EventEmitter<string>();

  constructor(private route:ActivatedRoute,    
              private productService:ProductService,
              private categoryService:CategoryService,
              private shoppingCartService:ShoppingCartService) {                
      
   
  }
  
  async ngOnInit() {
   this.cart$ = await this.shoppingCartService.getCart()
   setTimeout(async () =>{
    this.cart$ = await this.shoppingCartService.getCart();
     },500)
     this.categories$ = this.categoryService.
     getAll();


     this.populateProducts()
    
  }

  private populateProducts(){
    this.productService.getAll()
    .pipe(
      switchMap(products=>{
         this.products = products;
         this.categories$?.subscribe(c=>this.categories = c)
        //  setTimeout(async () =>{
        //   this.cart$ = await this.shoppingCartService.getCart();
        // },1200)
        // this.categories$?.pipe(
        //   switchMap(c=>{
        //     this.categories = c
        //      return this.shoppingCartService.getCart()
        //   })
        // ).subscribe(cart => this.cart$ = cart);
       
         return this.route.queryParamMap;
      })
    ).subscribe(
      params =>{
        this.category = params.get('category');
        this.applyFilter();      
     
      }
    ) 
  }
  private applyFilter(){
    this.filteredProducts = (this.category)?
    this.products?.filter( p=>{
      return p.category! === this.category}):
    this.products

    this.categoryName = this.categories?.find(c => c.key === this.category)  
    if(this.categoryName?.name) 
      this.category = this.categoryName.name
  }
  toggle(){
    this.toggleBtn = !this.toggleBtn;
  }
}
