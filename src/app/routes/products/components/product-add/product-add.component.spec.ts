import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponentsProductAddComponent } from './product-add.component';

describe('ProductAddComponent', () => {
  let component: ProductsComponentsProductAddComponent;
  let fixture: ComponentFixture<ProductsComponentsProductAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsComponentsProductAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponentsProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
