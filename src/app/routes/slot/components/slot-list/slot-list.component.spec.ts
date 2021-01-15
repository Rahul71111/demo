import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotComponentsSlotListComponent } from './slot-list.component';

describe('SlotListComponent', () => {
  let component: SlotComponentsSlotListComponent;
  let fixture: ComponentFixture<SlotComponentsSlotListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotComponentsSlotListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotComponentsSlotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
