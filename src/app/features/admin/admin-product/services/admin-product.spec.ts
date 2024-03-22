import { TestBed } from '@angular/core/testing';

import { AdminProductService } from './admin-product-service.service';

describe('AdminProductServiceService', () => {
  let service: AdminProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
