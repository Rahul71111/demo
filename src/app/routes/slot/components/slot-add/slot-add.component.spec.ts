import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotComponentsSlotAddComponent } from './slot-add.component';

describe('SlotAddComponent', () => {
  let component: SlotComponentsSlotAddComponent;
  let fixture: ComponentFixture<SlotComponentsSlotAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotComponentsSlotAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotComponentsSlotAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
