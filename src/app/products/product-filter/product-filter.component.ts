import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import Category from 'src/app/models/category.model';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$: Observable<Category[]>;
  @Input('category') category:any;

  constructor(private categoryService:CategoryService) {
    this.categories$ = this.categoryService.getAll();
   }

  ngOnInit(): void {
  }

}
