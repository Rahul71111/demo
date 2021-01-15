import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersComponentsOrderViewComponent } from './order-view.component';

describe('OrderViewComponent', () => {
  let component: OrdersComponentsOrderViewComponent;
  let fixture: ComponentFixture<OrdersComponentsOrderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersComponentsOrderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersComponentsOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
