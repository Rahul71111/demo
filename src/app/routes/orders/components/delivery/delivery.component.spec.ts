import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersComponentsDeliveryComponent } from './delivery.component';

describe('DeliveryComponent', () => {
  let component: OrdersComponentsDeliveryComponent;
  let fixture: ComponentFixture<OrdersComponentsDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersComponentsDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersComponentsDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
