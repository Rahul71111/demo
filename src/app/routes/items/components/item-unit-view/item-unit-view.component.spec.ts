import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemUnitViewComponent } from './item-unit-view.component';

describe('ItemUnitViewComponent', () => {
  let component: ItemUnitViewComponent;
  let fixture: ComponentFixture<ItemUnitViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemUnitViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemUnitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
