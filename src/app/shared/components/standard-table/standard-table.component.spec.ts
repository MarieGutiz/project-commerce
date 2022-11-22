import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardTableComponent } from './standard-table.component';

describe('StandardTableComponent', () => {
  let component: StandardTableComponent;
  let fixture: ComponentFixture<StandardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
