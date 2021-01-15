import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingUnitsComponentsProcessingAddComponent } from './processing-add.component';

describe('ProcessingAddComponent', () => {
  let component: ProcessingUnitsComponentsProcessingAddComponent;
  let fixture: ComponentFixture<ProcessingUnitsComponentsProcessingAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingUnitsComponentsProcessingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingUnitsComponentsProcessingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
