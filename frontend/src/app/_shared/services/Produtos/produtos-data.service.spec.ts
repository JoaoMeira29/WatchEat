import { TestBed } from '@angular/core/testing';

import { ProdutosDataService } from './produtos-data.service';

describe('ProdutosDataService', () => {
  let service: ProdutosDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutosDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
