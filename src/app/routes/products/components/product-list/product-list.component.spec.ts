import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponentsProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductsComponentsProductListComponent;
  let fixture: ComponentFixture<ProductsComponentsProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsComponentsProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponentsProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
