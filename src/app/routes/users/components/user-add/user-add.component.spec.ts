import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUserAddComponent } from './user-add.component';

describe('UserAddComponent', () => {
  let component: UsersUserAddComponent;
  let fixture: ComponentFixture<UsersUserAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersUserAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
