import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponentsItemListComponent } from './item-list.component';

describe('ItemListComponent', () => {
  let component: ItemsComponentsItemListComponent;
  let fixture: ComponentFixture<ItemsComponentsItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsComponentsItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponentsItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
