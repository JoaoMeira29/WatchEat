import { TestBed } from '@angular/core/testing';

import { GenerosDataService } from './generos-data.service';

describe('GenerosDataService', () => {
  let service: GenerosDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerosDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
