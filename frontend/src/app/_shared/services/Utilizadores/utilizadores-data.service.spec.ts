import { TestBed } from '@angular/core/testing';

import { UtilizadoresDataService } from './utilizadores-data.service';

describe('UtilizadoresDataService', () => {
  let service: UtilizadoresDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilizadoresDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
