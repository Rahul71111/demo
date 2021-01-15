import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponentsItemAddComponent } from './item-add.component';

describe('ItemAddComponent', () => {
  let component: ItemsComponentsItemAddComponent;
  let fixture: ComponentFixture<ItemsComponentsItemAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsComponentsItemAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponentsItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
