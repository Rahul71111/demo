import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOrderListComponent } from './order-list.component';

describe('OrderListComponent', () => {
  let component: OrdersOrderListComponent;
  let fixture: ComponentFixture<OrdersOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
