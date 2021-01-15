import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { requestViewComponent } from './request-view.component';

describe('OrderViewComponent', () => {
  let component: requestViewComponent;
  let fixture: ComponentFixture<requestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ requestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(requestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
