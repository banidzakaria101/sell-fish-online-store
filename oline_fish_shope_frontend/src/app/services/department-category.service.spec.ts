import { TestBed } from '@angular/core/testing';

import { DepartmentCategoryService } from './department-category.service';

describe('DepartmentCategoryService', () => {
  let service: DepartmentCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
