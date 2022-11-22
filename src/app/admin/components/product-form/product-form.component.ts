import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import Product from 'shared/models/product.model';
import Category from 'shared/models/category.model';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';

const { minLength, required, requiredTrue, min ,pattern} = Validators;
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent  {
  categorie$!: Observable<Category[]>;
  form!: FormGroup;

  product:Product = new Product;
  productById :Product = new Product;
  id: string | null;

  constructor(private categoryService: CategoryService,
              private productService:ProductService,
              private fb:FormBuilder,
              private router:Router,
              private route:ActivatedRoute) {

       this.categorie$ = this.categoryService.getAll();
       this.id = this.route.snapshot.paramMap.get('id');
       
       if(this.id) {
        this.productService.getProducts(this.id).pipe(take(1)).subscribe(
          p=>{
            this.productById = p;
            this.update();
          }
        )
       }



       this.createForm();
   }
  update() {
    this.form.get('productForm.title')?.setValue(this.productById.title);
    this.form.get('productForm.price')?.setValue(this.productById.price);
    this.form.get('productForm.category')?.setValue(this.productById.category);
    this.form.get('productForm.image')?.setValue(this.productById.image);
  }
  createForm() {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    const productForm = this.fb.group({
   
      title: [null, [required, minLength(3)]],
      price:[null, [required, min(1)]],
      category:[null,[required]],
      image:[null, [required, pattern(urlRegex)]]

    });   
    
    this.form = this.fb.group({ productForm });
  }

  save(){
    if (!this.form.valid) return;
    this.saveAll();
    if(this.id)this.productService.update(this.id, this.product);
    
    else {     
      this.productService.create(this.product);
    }  
    this.router.navigate(['/admin/products']);
  }

  saveAll(){
    this.product.title=  this.form.get('productForm.title')?.value;
    this.product.price=  this.form.get('productForm.price')?.value;
    this.product.category=  this.form.get('productForm.category')?.value;
    this.product.image=  this.form.get('productForm.image')?.value;
  }

  delete(){
    if(!this.id)return;
    if(!confirm('Are you sure you want to delete this product')) return
      
    this.productService.delete(this.id);
      

      this.router.navigate(['/admin/products']);
  }

  returnBck(){
    this.router.navigate(['/admin/products']);
  }
}

