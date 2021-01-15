import { TestBed } from '@angular/core/testing';

import { CategoriesStateService } from './categories-state.service';

describe('CategoriesStateService', () => {
  let service: CategoriesStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
