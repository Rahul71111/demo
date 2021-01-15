import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UsersUserListComponent;
  let fixture: ComponentFixture<UsersUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
