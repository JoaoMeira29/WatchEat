import { TestBed } from '@angular/core/testing';

import { EstatisticasDataService } from './estatisticas-data.service';

describe('EstatisticasDataService', () => {
  let service: EstatisticasDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstatisticasDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
