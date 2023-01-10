import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.scss']
})
export class PriceRangeComponent implements OnInit {

  value: number = 10;
  highValue: number = 90;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    showTicks: true
  };
  constructor() { 
    this.create();
  }
  create() {
  
  }

  ngOnInit(): void {
  }

}
