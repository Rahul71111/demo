import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingUnitsProcessingListComponent } from './processing-list.component';

describe('ProcessingListComponent', () => {
  let component: ProcessingUnitsProcessingListComponent;
  let fixture: ComponentFixture<ProcessingUnitsProcessingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingUnitsProcessingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingUnitsProcessingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
