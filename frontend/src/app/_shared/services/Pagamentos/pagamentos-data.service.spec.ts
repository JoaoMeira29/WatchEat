import { TestBed } from '@angular/core/testing';

import { PagamentosDataService } from './pagamentos-data.service';

describe('PagamentosDataService', () => {
  let service: PagamentosDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagamentosDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
